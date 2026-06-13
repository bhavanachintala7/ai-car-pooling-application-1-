"""
=============================================================
AI SERVICE - Google Gemini Integration
=============================================================
Model: gemini-1.5-pro
Features: Ride recommendations, Trip summaries, Route analysis,
          Passenger suggestions, Travel recommendations
=============================================================
"""

import os
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()

# Configure Gemini
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))
model = genai.GenerativeModel('gemini-1.5-pro')

# ── PROMPT TEMPLATES ──────────────────────────────────────

RIDE_RECOMMENDATION_PROMPT = """
You are an expert AI ride advisor for RideShare AI platform in Hyderabad, India.

Ride Details:
- Pickup: {pickup}
- Destination: {destination}
- Date & Time: {date} at {time}
- Driver: {driver_name} (Rating: {driver_rating}★, {total_rides} rides)
- Vehicle: {vehicle_make} {vehicle_model} ({vehicle_color})
- Available Seats: {available_seats}
- Price per seat: ₹{price}
- KNN Match Score: {match_score}/100 ({match_level})
- Preferences: AC: {ac}, Music: {music}, Pets: {pets}, Smoking: {smoking}

Generate a comprehensive, friendly ride recommendation in 2-3 sentences. 
Highlight suitability for the passenger, driver reliability, comfort factors, 
and value for money. Use specific details. Keep under 120 words.
"""

TRIP_SUMMARY_PROMPT = """
Generate a concise trip summary for a carpooling platform:

Trip: {pickup} → {destination}
Distance: {distance} | Duration: {duration}
Departure: {date} at {time}
Price: ₹{price} per seat
Driver Rating: {driver_rating}★

Provide: Route efficiency note, estimated traffic conditions for this time, 
cost comparison vs auto-rickshaw/cab, and 1 travel tip. 
Keep under 100 words. Use Rupee symbol (₹) for prices.
"""

ROUTE_SUITABILITY_PROMPT = """
Analyze carpooling route suitability in Hyderabad, India:

Route: {pickup} → {destination}
Travel Time: {time}
Average Traffic Score: {traffic_score}/10

Provide:
1. Suitability score (1-10) with brief reason
2. Peak hour traffic prediction (morning 7-10 AM / evening 5-8 PM)
3. Best departure time recommendation
4. Alternative route suggestion if applicable

Keep response structured and under 150 words.
"""

PASSENGER_SUGGESTIONS_PROMPT = """
Based on this passenger's travel profile on RideShare AI:

Passenger Rating: {passenger_rating}★
Travel Preferences: AC:{ac}, Music:{music}, No Smoking:{no_smoking}
Most Traveled Route: {common_route}
Travel History: {total_trips} completed trips

Generate personalized travel suggestions:
1. Best time slots for booking (based on route)
2. Preferred driver characteristics to look for
3. Cost optimization tip
4. Safety recommendation

Keep under 150 words. Be specific and actionable.
"""


# ── AI SERVICE FUNCTIONS ──────────────────────────────────

async def generate_ride_recommendation(ride_data: dict) -> str:
    """Generate AI ride recommendation using Gemini"""
    try:
        prompt = RIDE_RECOMMENDATION_PROMPT.format(**ride_data)
        response = await model.generate_content_async(prompt)
        return response.text
    except Exception as e:
        return f"Unable to generate AI insight: {str(e)}"


async def generate_trip_summary(trip_data: dict) -> str:
    """Generate AI trip summary"""
    try:
        prompt = TRIP_SUMMARY_PROMPT.format(**trip_data)
        response = await model.generate_content_async(prompt)
        return response.text
    except Exception as e:
        return f"Trip summary unavailable: {str(e)}"


async def analyze_route_suitability(route_data: dict) -> str:
    """Analyze route suitability with AI"""
    try:
        prompt = ROUTE_SUITABILITY_PROMPT.format(**route_data)
        response = await model.generate_content_async(prompt)
        return response.text
    except Exception as e:
        return f"Route analysis unavailable: {str(e)}"


async def generate_passenger_suggestions(passenger_data: dict) -> str:
    """Generate personalized passenger travel suggestions"""
    try:
        prompt = PASSENGER_SUGGESTIONS_PROMPT.format(**passenger_data)
        response = await model.generate_content_async(prompt)
        return response.text
    except Exception as e:
        return f"Suggestions unavailable: {str(e)}"


# ── SAMPLE OUTPUTS ────────────────────────────────────────

SAMPLE_OUTPUTS = {
    "ride_recommendation": """
This ride from Gachibowli to Hitech City is highly recommended for office commuters! 
Driver Arjun Sharma has an excellent 4.8★ rating with 247 verified trips, 
demonstrating exceptional reliability. His AC-equipped Honda City provides a comfortable 
commute at just ₹80 per seat — 45% cheaper than cab services. The 8:30 AM departure 
aligns perfectly with IT office hours with a KNN compatibility score of 95/100.
""",
    
    "trip_summary": """
Route: Gachibowli → Hitech City (5.2 km, ~18 min)
Traffic: Light-moderate at 8:30 AM via DLF Cyber City route.
Cost: ₹80/seat — saves ₹120 vs Ola/Uber, ₹40 vs auto-rickshaw.
Tip: Board 5 minutes early at Gachibowli Metro gate for smooth pickup.
""",
    
    "route_suitability": """
Suitability Score: 9.2/10 — Highly efficient tech corridor route.
Morning Traffic (7-10 AM): Moderate congestion near DLF. Allow +5 min buffer.
Recommended Departure: 8:15 AM for punctual 8:30 AM office arrival.
Alternative: Via ORR (2 km longer but 8 min faster during peak hours).
""",
    
    "passenger_suggestions": """
1. Book 7:45-8:30 AM slots — 3x more Best Match rides available
2. Prioritize drivers with 4.5★+ and 100+ trips for reliability
3. Book 2 seats if traveling with colleague — saves ₹60/day vs solo cabs
4. Always verify driver photo before boarding; share trip details with contacts
"""
}
