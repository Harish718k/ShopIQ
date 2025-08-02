export const uploadBrandLogo = (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: false, message: 'No file uploaded' });
  }

  const logoUrl = `${process.env.BACKEND_URL}/uploads/brand/${req.file.filename}`;

  // You can optionally store this in DB or config file here
  return res.status(200).json({
    success: true,
    message: 'Brand logo uploaded successfully',
    logoUrl,
  });
};
