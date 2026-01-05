import { Client } from "@gradio/client";

const HF_SPACE_URL = "ZakyAlf/Compros";

interface RecommendationInput {
  title: string;
  k?: number; // Number of recommendations
}

interface RecommendationResult {
  recommendations: string[];
}

/**
 * Get book recommendations from Hugging Face model
 */
export async function getHFRecommendations(
  bookTitle: string,
  count: number = 10
): Promise<string[]> {
  try {
    const client = await Client.connect(HF_SPACE_URL);
    
    const result = await client.predict("/lambda_1", {
      title: bookTitle,
      k: count,
    });

    // Parse result
    if (result.data && Array.isArray(result.data)) {
      return result.data as string[];
    }

    return [];
  } catch (error) {
    console.error("HF Recommendation Error:", error);
    return [];
  }
}

/**
 * Get recommendations based on multiple book titles
 */
export async function getMultipleRecommendations(
  bookTitles: string[],
  count: number = 10
): Promise<string[]> {
  try {
    // Get recommendations for each title
    const allRecommendations = await Promise.all(
      bookTitles.slice(0, 3).map((title) => getHFRecommendations(title, 5))
    );

    // Flatten and deduplicate
    const uniqueRecommendations = [...new Set(allRecommendations.flat())];

    return uniqueRecommendations.slice(0, count);
  } catch (error) {
    console.error("Multiple Recommendations Error:", error);
    return [];
  }
}
