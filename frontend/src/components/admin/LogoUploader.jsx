import { useState } from "react";
import axios from "axios";

function BrandLogoUpload() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [logoUrl, setLogoUrl] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    if (file) {
      setPreview(URL.createObjectURL(file)); // show preview before saving
    }
  };

  const handleSave = async () => {
    if (!selectedFile) {
      alert("Please choose a logo image first.");
      return;
    }

    const formData = new FormData();
    formData.append("brandLogo", selectedFile);

    try {
      const res = await axios.post("/api/v1/admin/settings/upload-brand-logo", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.data.success) {
        setLogoUrl(res.data.logoUrl);
        alert("Logo uploaded successfully!");
      }
    } catch (err) {
      console.error("Upload error:", err);
      alert("Failed to upload logo.");
    }
  };

  return (
    <div className="space-y-4 text-white">
      <input type="file" accept="image/*" onChange={handleFileChange} />
      
      {preview && (
        <img src={preview} alt="Preview" className="w-32 h-auto border rounded" />
      )}

      <button
        onClick={handleSave}
        className="bg-emerald-600 px-4 py-2 rounded hover:bg-emerald-700"
      >
        Save Changes
      </button>

      {logoUrl && (
        <div>
          <p className="text-sm mt-2 text-gray-300">Saved Logo:</p>
          <img src={logoUrl} alt="Saved Logo" className="w-32 h-auto border rounded" />
        </div>
      )}
    </div>
  );
}

export default BrandLogoUpload;
