// URL base del backend (JSON)
const API_BASE_URL = "http://localhost:3000/api";

const getAllFonts = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/fonts`);

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `Error: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error al obtener las tipografías:", error);
    throw error;
  }
};

const createFont = async (fontData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/fonts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(fontData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `Error: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

const updateFont = async (id, fontData) => {
    try {
        const response = await fetch(`${API_BASE_URL}/fonts/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(fontData),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || `Error: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        throw error;
    }
};

const deleteFont = async (id) => {
    try {
        const response = await fetch(`${API_BASE_URL}/fonts/${id}`, {
            method: "DELETE",
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || `Error: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        throw error;
    }
};

export const FontsService = {
  getAllFonts,
  createFont,
  updateFont,
  deleteFont,
};
