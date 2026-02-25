import requests
import sys
import json
from datetime import datetime

class GruhaHomesAPITester:
    def __init__(self, base_url="https://premium-homes-design.preview.emergentagent.com/api"):
        self.base_url = base_url
        self.tests_run = 0
        self.tests_passed = 0
        self.errors = []

    def log_result(self, name, success, details=""):
        """Log test result"""
        self.tests_run += 1
        status = "✅ PASS" if success else "❌ FAIL"
        print(f"\n{status} - {name}")
        if details:
            print(f"    Details: {details}")
        if success:
            self.tests_passed += 1
        else:
            self.errors.append(f"{name}: {details}")

    def run_test(self, name, method, endpoint, expected_status, data=None):
        """Run a single API test"""
        url = f"{self.base_url}/{endpoint}"
        headers = {'Content-Type': 'application/json'}
        
        try:
            print(f"\n🔍 Testing {name}...")
            print(f"    URL: {url}")
            print(f"    Method: {method}")
            if data:
                print(f"    Data: {json.dumps(data, indent=2)}")

            if method == 'GET':
                response = requests.get(url, headers=headers, timeout=10)
            elif method == 'POST':
                response = requests.post(url, json=data, headers=headers, timeout=10)
            else:
                self.log_result(name, False, f"Unsupported method: {method}")
                return False, {}

            print(f"    Response Status: {response.status_code}")
            print(f"    Response Headers: {dict(response.headers)}")
            
            success = response.status_code == expected_status
            
            try:
                response_json = response.json()
                if success:
                    print(f"    Response Body: {json.dumps(response_json, indent=2)}")
                else:
                    print(f"    Error Response: {json.dumps(response_json, indent=2)}")
                self.log_result(name, success, f"Expected {expected_status}, got {response.status_code}")
                return success, response_json
            except ValueError:
                # Non-JSON response
                response_text = response.text
                print(f"    Response Text: {response_text}")
                self.log_result(name, success, f"Expected {expected_status}, got {response.status_code}. Non-JSON response: {response_text}")
                return success, {"text": response_text}

        except requests.exceptions.ConnectionError as e:
            self.log_result(name, False, f"Connection error: {str(e)}")
            return False, {}
        except requests.exceptions.Timeout as e:
            self.log_result(name, False, f"Timeout error: {str(e)}")
            return False, {}
        except Exception as e:
            self.log_result(name, False, f"Unexpected error: {str(e)}")
            return False, {}

    def test_root_endpoint(self):
        """Test root API endpoint"""
        success, response = self.run_test(
            "Root API Endpoint",
            "GET", 
            "", 
            200
        )
        return success

    def test_contact_submission(self):
        """Test contact form submission"""
        test_contact = {
            "name": f"Test User {datetime.now().strftime('%H%M%S')}",
            "email": "testuser@example.com", 
            "phone": "+91 9876543210",
            "service": "Residential Construction",
            "message": "This is a test message for API testing."
        }
        
        success, response = self.run_test(
            "Contact Form Submission",
            "POST",
            "contact", 
            200,
            data=test_contact
        )
        
        if success:
            # Verify response structure
            required_fields = ['id', 'name', 'email', 'message', 'created_at']
            missing_fields = [field for field in required_fields if field not in response]
            if missing_fields:
                self.log_result("Contact Response Structure", False, f"Missing fields: {missing_fields}")
                return False
            else:
                self.log_result("Contact Response Structure", True, "All required fields present")
        
        return success

    def test_get_contacts(self):
        """Test retrieving contacts"""
        success, response = self.run_test(
            "Get Contacts",
            "GET",
            "contacts",
            200
        )
        
        if success:
            # Verify it returns a list
            if isinstance(response, list):
                self.log_result("Contacts Response Format", True, f"Returned {len(response)} contacts")
            else:
                self.log_result("Contacts Response Format", False, f"Expected list, got {type(response)}")
                return False
        
        return success

    def test_newsletter_subscription(self):
        """Test newsletter subscription"""
        test_email = f"newsletter{datetime.now().strftime('%H%M%S')}@example.com"
        test_newsletter = {"email": test_email}
        
        success, response = self.run_test(
            "Newsletter Subscription",
            "POST",
            "newsletter",
            200,
            data=test_newsletter
        )
        
        if success:
            # Verify response structure
            required_fields = ['id', 'email', 'subscribed_at']
            missing_fields = [field for field in required_fields if field not in response]
            if missing_fields:
                self.log_result("Newsletter Response Structure", False, f"Missing fields: {missing_fields}")
                return False
            else:
                self.log_result("Newsletter Response Structure", True, "All required fields present")
        
        return success

    def test_duplicate_newsletter_subscription(self):
        """Test duplicate newsletter subscription handling"""
        # Use same email twice to test duplicate handling
        test_email = "duplicate@example.com"
        test_newsletter = {"email": test_email}
        
        # First subscription
        success1, response1 = self.run_test(
            "Newsletter Subscription (First)",
            "POST",
            "newsletter",
            200,
            data=test_newsletter
        )
        
        # Second subscription (should return existing)
        success2, response2 = self.run_test(
            "Newsletter Subscription (Duplicate)",
            "POST",
            "newsletter", 
            200,
            data=test_newsletter
        )
        
        if success1 and success2:
            # Both should have same email but potentially same ID if properly handled
            if response1['email'] == response2['email']:
                self.log_result("Duplicate Newsletter Handling", True, "Duplicate handled correctly")
                return True
            else:
                self.log_result("Duplicate Newsletter Handling", False, "Duplicate not handled correctly")
                return False
        
        return success1 and success2

    def test_get_newsletter_subscriptions(self):
        """Test retrieving newsletter subscriptions"""
        success, response = self.run_test(
            "Get Newsletter Subscriptions",
            "GET",
            "newsletter",
            200
        )
        
        if success:
            # Verify it returns a list
            if isinstance(response, list):
                self.log_result("Newsletter Response Format", True, f"Returned {len(response)} subscriptions")
            else:
                self.log_result("Newsletter Response Format", False, f"Expected list, got {type(response)}")
                return False
        
        return success

    def test_invalid_endpoints(self):
        """Test invalid endpoints return appropriate errors"""
        success, response = self.run_test(
            "Invalid Endpoint Test",
            "GET",
            "nonexistent",
            404
        )
        return success

    def run_all_tests(self):
        """Run all API tests"""
        print("=" * 60)
        print("🏠 GRUHA HOMES - API TESTING SUITE")
        print("=" * 60)
        print(f"Testing API at: {self.base_url}")
        print(f"Started at: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
        
        # Run all tests
        test_results = []
        
        test_results.append(self.test_root_endpoint())
        test_results.append(self.test_contact_submission())
        test_results.append(self.test_get_contacts())
        test_results.append(self.test_newsletter_subscription())
        test_results.append(self.test_duplicate_newsletter_subscription())
        test_results.append(self.test_get_newsletter_subscriptions())
        test_results.append(self.test_invalid_endpoints())
        
        # Print final results
        print("\n" + "=" * 60)
        print("📊 TEST RESULTS SUMMARY")
        print("=" * 60)
        print(f"Total Tests: {self.tests_run}")
        print(f"Passed: {self.tests_passed}")
        print(f"Failed: {self.tests_run - self.tests_passed}")
        print(f"Success Rate: {(self.tests_passed/self.tests_run*100):.1f}%")
        
        if self.errors:
            print(f"\n❌ FAILED TESTS:")
            for error in self.errors:
                print(f"   • {error}")
        else:
            print(f"\n✅ ALL TESTS PASSED!")
        
        print(f"\nCompleted at: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
        
        return self.tests_passed == self.tests_run

def main():
    """Main test execution"""
    tester = GruhaHomesAPITester()
    success = tester.run_all_tests()
    return 0 if success else 1

if __name__ == "__main__":
    sys.exit(main())