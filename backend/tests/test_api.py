"""
Gruha Homes API Test Suite
Tests for Contact and Newsletter API endpoints
"""
import pytest
import requests
import os
import uuid

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', '').rstrip('/')

@pytest.fixture(scope="module")
def api_client():
    """Shared requests session for all tests"""
    session = requests.Session()
    session.headers.update({"Content-Type": "application/json"})
    return session


class TestHealthCheck:
    """Root API endpoint tests"""
    
    def test_api_root_returns_200(self, api_client):
        """Test that root API endpoint returns 200"""
        response = api_client.get(f"{BASE_URL}/api/")
        assert response.status_code == 200
        data = response.json()
        assert "message" in data
        assert data["message"] == "Gruha Homes API"


class TestContactAPI:
    """Contact form submission API tests"""
    
    def test_create_contact_success(self, api_client):
        """Test successful contact form submission"""
        unique_id = str(uuid.uuid4())[:8]
        payload = {
            "name": f"TEST_User_{unique_id}",
            "email": f"test_{unique_id}@example.com",
            "phone": "+91 9876543210",
            "service": "Residential Construction",
            "message": "This is a test message for API testing"
        }
        response = api_client.post(f"{BASE_URL}/api/contact", json=payload)
        
        # Status assertion
        assert response.status_code == 200
        
        # Data assertions
        data = response.json()
        assert data["name"] == payload["name"]
        assert data["email"] == payload["email"]
        assert data["phone"] == payload["phone"]
        assert data["service"] == payload["service"]
        assert data["message"] == payload["message"]
        assert "id" in data
        assert "created_at" in data
    
    def test_create_contact_minimal_fields(self, api_client):
        """Test contact with only required fields"""
        unique_id = str(uuid.uuid4())[:8]
        payload = {
            "name": f"TEST_Minimal_{unique_id}",
            "email": f"minimal_{unique_id}@test.com",
            "message": "Minimal test message"
        }
        response = api_client.post(f"{BASE_URL}/api/contact", json=payload)
        
        assert response.status_code == 200
        data = response.json()
        assert data["name"] == payload["name"]
        assert data["email"] == payload["email"]
        assert data["message"] == payload["message"]
    
    def test_create_contact_missing_required_field(self, api_client):
        """Test contact without required email field - should fail"""
        payload = {
            "name": "Test User",
            "message": "Test message"
        }
        response = api_client.post(f"{BASE_URL}/api/contact", json=payload)
        
        # Should return 422 for validation error
        assert response.status_code == 422
    
    def test_get_contacts_returns_list(self, api_client):
        """Test that GET /contacts returns a list"""
        response = api_client.get(f"{BASE_URL}/api/contacts")
        
        assert response.status_code == 200
        data = response.json()
        assert isinstance(data, list)
    
    def test_create_and_verify_contact_persistence(self, api_client):
        """Create → GET pattern: verify contact is persisted"""
        unique_id = str(uuid.uuid4())[:8]
        payload = {
            "name": f"TEST_Persist_{unique_id}",
            "email": f"persist_{unique_id}@test.com",
            "message": "Persistence test message"
        }
        
        # Create contact
        create_response = api_client.post(f"{BASE_URL}/api/contact", json=payload)
        assert create_response.status_code == 200
        created_contact = create_response.json()
        
        # GET all contacts and verify our contact exists
        get_response = api_client.get(f"{BASE_URL}/api/contacts")
        assert get_response.status_code == 200
        contacts = get_response.json()
        
        # Find our created contact by ID
        found = any(c.get("id") == created_contact["id"] for c in contacts)
        assert found, "Created contact not found in contacts list"


class TestNewsletterAPI:
    """Newsletter subscription API tests"""
    
    def test_subscribe_newsletter_success(self, api_client):
        """Test successful newsletter subscription"""
        unique_id = str(uuid.uuid4())[:8]
        payload = {
            "email": f"newsletter_test_{unique_id}@example.com"
        }
        response = api_client.post(f"{BASE_URL}/api/newsletter", json=payload)
        
        # Status assertion
        assert response.status_code == 200
        
        # Data assertions
        data = response.json()
        assert data["email"] == payload["email"]
        assert "id" in data
        assert "subscribed_at" in data
    
    def test_subscribe_newsletter_duplicate(self, api_client):
        """Test that duplicate email returns existing subscription"""
        unique_id = str(uuid.uuid4())[:8]
        email = f"duplicate_test_{unique_id}@example.com"
        payload = {"email": email}
        
        # First subscription
        response1 = api_client.post(f"{BASE_URL}/api/newsletter", json=payload)
        assert response1.status_code == 200
        first_sub = response1.json()
        
        # Second subscription with same email
        response2 = api_client.post(f"{BASE_URL}/api/newsletter", json=payload)
        assert response2.status_code == 200
        second_sub = response2.json()
        
        # Should return the same subscription (same ID)
        assert first_sub["id"] == second_sub["id"]
        assert first_sub["email"] == second_sub["email"]
    
    def test_subscribe_newsletter_missing_email(self, api_client):
        """Test subscription without email - should fail"""
        payload = {}
        response = api_client.post(f"{BASE_URL}/api/newsletter", json=payload)
        
        # Should return 422 for validation error
        assert response.status_code == 422
    
    def test_get_newsletter_subscriptions(self, api_client):
        """Test GET /newsletter returns list of subscriptions"""
        response = api_client.get(f"{BASE_URL}/api/newsletter")
        
        assert response.status_code == 200
        data = response.json()
        assert isinstance(data, list)
    
    def test_create_and_verify_newsletter_persistence(self, api_client):
        """Create → GET pattern: verify subscription is persisted"""
        unique_id = str(uuid.uuid4())[:8]
        email = f"persist_newsletter_{unique_id}@test.com"
        payload = {"email": email}
        
        # Create subscription
        create_response = api_client.post(f"{BASE_URL}/api/newsletter", json=payload)
        assert create_response.status_code == 200
        created_sub = create_response.json()
        
        # GET all subscriptions and verify our subscription exists
        get_response = api_client.get(f"{BASE_URL}/api/newsletter")
        assert get_response.status_code == 200
        subscriptions = get_response.json()
        
        # Find our created subscription by ID
        found = any(s.get("id") == created_sub["id"] for s in subscriptions)
        assert found, "Created subscription not found in subscriptions list"


if __name__ == "__main__":
    pytest.main([__file__, "-v"])
