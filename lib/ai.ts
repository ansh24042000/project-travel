
import { GoogleGenAI, Type } from "@google/genai";
import { UserSession, RecommendedDestination, DetailedItinerary } from "../types";

const getAI = () => new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function getRecommendations(session: UserSession): Promise<RecommendedDestination[]> {
  try {
    const ai = getAI();
    const prompt = `As an expert travel planner, suggest 3 highly personalized destinations for:
      User: ${session.fullName}
      Group Size: ${session.travelers.adults} Adults, ${session.travelers.children} Children
      Interests: ${session.preferences.join(', ')}
      Origin: ${session.startingCity || 'Global Search'}
      Budget Level: ${session.budget || 'Flexible'}
      Preferred Dates: ${session.startDate && session.endDate ? `${session.startDate} to ${session.endDate}` : 'Flexible'}
      
      Ensure suggestions align with ALL interests provided. Categorize them as: 
      - "Best Match": The most personalized choice.
      - "Budget Friendly": Great value for money.
      - "Premium": Luxury/exclusive experience.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              id: { type: Type.STRING },
              name: { type: Type.STRING },
              country: { type: Type.STRING },
              description: { type: Type.STRING },
              category: { type: Type.STRING, description: "Must be one of: Best Match, Budget Friendly, Premium" },
              bestTimeToVisit: { type: Type.STRING },
              duration: { type: Type.STRING },
              imageSearchQuery: { type: Type.STRING },
              highlights: { type: Type.ARRAY, items: { type: Type.STRING } }
            },
            required: ["id", "name", "country", "description", "category", "bestTimeToVisit", "duration", "imageSearchQuery", "highlights"]
          }
        }
      }
    });

    const text = response.text || "[]";
    return JSON.parse(text);
  } catch (error) {
    console.error("AI Recommendations Error:", error);
    return [];
  }
}

export async function getItinerary(destination: string, session: UserSession): Promise<DetailedItinerary> {
  try {
    const ai = getAI();
    const prompt = `Create a 4-5 day detailed itinerary for ${destination} for a party of ${session.travelers.adults} adults and ${session.travelers.children} children interested in ${session.preferences.join(' and ')}. Include local gems and practical timings.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            destination: { type: Type.STRING },
            days: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  day: { type: Type.NUMBER },
                  activities: { type: Type.ARRAY, items: { type: Type.STRING } }
                }
              }
            }
          }
        }
      }
    });

    const text = response.text || "{}";
    const data = JSON.parse(text);
    return {
      destination: data.destination || destination,
      days: data.days || []
    };
  } catch (error) {
    console.error("AI Itinerary Error:", error);
    return { destination, days: [] };
  }
}

/**
 * Creates a chat instance for the Travel Assistant with destination context.
 */
export function createTravelChat(destination: RecommendedDestination, itinerary: DetailedItinerary | null, session: UserSession) {
  const ai = getAI();
  const systemInstruction = `You are a helpful and knowledgeable travel assistant for Avyukt. 
  You are assisting ${session.fullName} with their trip to ${destination.name}, ${destination.country}.
  Trip context: ${destination.description}. 
  Itinerary: ${itinerary ? JSON.stringify(itinerary.days) : 'Not generated yet'}.
  Travelers: ${session.travelers.adults} adults and ${session.travelers.children} children.
  Interests: ${session.preferences.join(', ')}.
  
  NEW CAPABILITY: You can now assist with Group Wallet queries. 
  If users ask about money, payments, or contributions, explain that you track both Online and Physical contributions 
  to ensure fair settlement. You can provide advice on how to split costs fairly based on the itinerary.
  
  Be concise, friendly, and provide practical advice on packing, food, local customs, and weather.`;

  return ai.chats.create({
    model: 'gemini-3-flash-preview',
    config: {
      systemInstruction,
    },
  });
}