import requests
import sys
import json
from datetime import datetime

class ValentineGiftAPITester:
    def __init__(self, base_url="https://heartsinsight.preview.emergentagent.com"):
        self.base_url = base_url
        self.api_url = f"{base_url}/api"
        self.tests_run = 0
        self.tests_passed = 0

    def run_test(self, name, method, endpoint, expected_status, data=None, timeout=30):
        """Run a single API test"""
        url = f"{self.api_url}/{endpoint}"
        headers = {'Content-Type': 'application/json'}

        self.tests_run += 1
        print(f"\n🔍 Testing {name}...")
        print(f"   URL: {url}")
        
        try:
            if method == 'GET':
                response = requests.get(url, headers=headers, timeout=timeout)
            elif method == 'POST':
                response = requests.post(url, json=data, headers=headers, timeout=timeout)

            success = response.status_code == expected_status
            if success:
                self.tests_passed += 1
                print(f"✅ Passed - Status: {response.status_code}")
                try:
                    response_data = response.json()
                    print(f"   Response keys: {list(response_data.keys()) if isinstance(response_data, dict) else 'Array with ' + str(len(response_data)) + ' items'}")
                except:
                    print(f"   Response: {response.text[:100]}...")
            else:
                print(f"❌ Failed - Expected {expected_status}, got {response.status_code}")
                print(f"   Error: {response.text[:200]}...")

            return success, response.json() if response.status_code == 200 else {}

        except requests.exceptions.Timeout:
            print(f"❌ Failed - Request timeout after {timeout}s")
            return False, {}
        except Exception as e:
            print(f"❌ Failed - Error: {str(e)}")
            return False, {}

    def test_root_endpoint(self):
        """Test API root endpoint"""
        return self.run_test("API Root", "GET", "", 200)

    def test_status_endpoints(self):
        """Test status check endpoints"""
        # Test POST status
        test_data = {
            "client_name": f"test_client_{datetime.now().strftime('%H%M%S')}"
        }
        success, response = self.run_test("Create Status Check", "POST", "status", 200, test_data)
        
        if success:
            # Test GET status
            self.run_test("Get Status Checks", "GET", "status", 200)
        
        return success

    def test_generate_gifts_endpoint(self):
        """Test the main gift generation endpoint"""
        test_data = {
            "giver_name": "Alex",
            "recipient_name": "Sam",
            "budget": "2000",
            "about_them": "Sam is thoughtful, creative, and introverted. They love reading, painting, hiking, and cooking. They're passionate about art museums, indie films, and sustainable living. They have a soft spot for handwritten letters, vintage books, and cozy cafes.",
            "special_memory": "Our first date at the art museum where we spent hours discussing our favorite paintings and discovered we both love the same obscure artist.",
            "giver_gift_idea": "A custom art book featuring their favorite paintings",
            "why_meaningful": "They always talk about that first date and how art brings us together. This would be a physical reminder of our connection and their passion for art."
        }
        
        print(f"\n📝 Test data summary:")
        print(f"   Giver: {test_data['giver_name']}")
        print(f"   Recipient: {test_data['recipient_name']}")
        print(f"   Budget: ₹{test_data['budget']}")
        print(f"   Gift idea: {test_data['giver_gift_idea']}")
        
        success, response = self.run_test(
            "Generate Gift Ideas", 
            "POST", 
            "generate-gifts", 
            200, 
            test_data,
            timeout=60  # Longer timeout for AI generation
        )
        
        if success and response:
            # Validate response structure
            print(f"\n📊 Response Analysis:")
            if 'gifts' in response:
                gifts = response['gifts']
                print(f"   ✅ Found {len(gifts)} gift ideas")
                
                for i, gift in enumerate(gifts):
                    required_fields = ['title', 'description', 'why_it_works', 'personalization_tip', 'estimated_cost', 'category']
                    missing_fields = [field for field in required_fields if field not in gift]
                    
                    if missing_fields:
                        print(f"   ❌ Gift {i+1} missing fields: {missing_fields}")
                    else:
                        print(f"   ✅ Gift {i+1}: {gift['title']} ({gift['category']}) - {gift['estimated_cost']}")
            else:
                print(f"   ❌ No 'gifts' field in response")
                success = False
            
            if 'bundle' in response and response['bundle']:
                bundle = response['bundle']
                print(f"   ✅ Bundle: {bundle.get('bundle_name', 'No name')} - {bundle.get('total_cost', 'No cost')}")
                if 'items_list' in bundle:
                    print(f"   ✅ Bundle has {len(bundle['items_list'])} items")
                else:
                    print(f"   ❌ Bundle missing items_list")
            else:
                print(f"   ⚠️  No bundle in response")
        
        return success

    def test_invalid_requests(self):
        """Test error handling with invalid requests"""
        # Test with missing required fields
        invalid_data = {
            "giver_name": "Test",
            # Missing other required fields
        }
        
        success, _ = self.run_test(
            "Invalid Request (Missing Fields)", 
            "POST", 
            "generate-gifts", 
            422,  # Validation error
            invalid_data
        )
        
        return success

def main():
    print("🎁 Valentine's Gift API Testing Suite")
    print("=" * 50)
    
    tester = ValentineGiftAPITester()
    
    # Run all tests
    print("\n🚀 Starting API Tests...")
    
    # Basic connectivity
    tester.test_root_endpoint()
    
    # Status endpoints
    tester.test_status_endpoints()
    
    # Main functionality
    tester.test_generate_gifts_endpoint()
    
    # Error handling
    tester.test_invalid_requests()
    
    # Print final results
    print("\n" + "=" * 50)
    print(f"📊 Final Results: {tester.tests_passed}/{tester.tests_run} tests passed")
    
    if tester.tests_passed == tester.tests_run:
        print("🎉 All tests passed! API is working correctly.")
        return 0
    else:
        print("⚠️  Some tests failed. Check the details above.")
        return 1

if __name__ == "__main__":
    sys.exit(main())