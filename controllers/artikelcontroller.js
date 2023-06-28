const { Artikel } = require("../models");
const path = require("path");
const fs = require("fs");

exports.getartikel = async (req, res) => {
  try {
    const artikel = await Artikel.findAll();
    res.status(200).json(artikel);
  } catch (error) {
    console.log(error);
  }
};

exports.getartikelbyid = async (req, res) => {
  try {
    const artikel = await Artikel.findOne({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(artikel);
  } catch (error) {
    console.log(error);
  }
};

exports.createartikel = async (req, res) => {
  if (req.files === null)
    return res.status(400).json({ message: "Tidak ada file" });
  const title = req.body.title;
  const body = req.body.body;
  const file = req.files.image;
  const fileSize = file.data.length;
  const ext = path.extname(file.name);
  const fileName = file.md5 + ext;
  const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;
  const allowedType = [".png", ".jpg", ".jpeg"];
  if (!allowedType.includes(ext.toLowerCase()))
    return res.status(422).json({ message: "Invalid images" });
  if (fileSize > 5000000)
    return res
      .status(422)
      .json({ message: "file harus lebih kecil dari 5 MB" });

  file.mv(`./public/images/${fileName}`, async (error) => {
    if (error) return res.status(500).json({ message: error.message });
  });
  try {
    await Artikel.create({
      title: title,
      body: body,
      image: fileName,
      url: url,
    });
    res.status(201).json({ message: "artikel save suksess" });
  } catch (error) {
    console.log(error.message);
  }
};

exports.updateatikel = async (req, res) => {
  const artikel = await Artikel.findOne({
    where: {
      id: req.params.id,
    },
  });
  if (!artikel) return res.status(404).json({ msg: "No Data Found" });

  let fileName = "";
  if (req.files === null) {
    fileName = artikel.image;
  } else {
    const file = req.files.image;
    const fileSize = file.data.length;
    const ext = path.extname(file.name);
    fileName = file.md5 + ext;
    const allowedType = [".png", ".jpg", ".jpeg"];

    if (!allowedType.includes(ext.toLowerCase()))
      return res.status(422).json({ msg: "Invalid Images" });
    if (fileSize > 5000000)
      return res.status(422).json({ msg: "Image must be less than 5 MB" });

    const filepath = `./public/images/${artikel.image}`;
    fs.unlinkSync(filepath);

    file.mv(`./public/images/${fileName}`, (err) => {
      if (err) return res.status(500).json({ msg: err.message });
    });
  }
  const title = req.body.title;
  const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;

  try {
    await Product.update(
      { title: title, image: fileName, url: url },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    res.status(200).json({ msg: "Product Updated Successfuly" });
  } catch (error) {
    console.log(error.message);
  }
};

exports.deteleartikel = async (req, res) => {
  const artikel = await Artikel.findOne({
    where: {
      id: req.params.id,
    },
  });
  if (!artikel) return res.status(404).json({ msg: "No Data Found" });

  try {
    const filepath = `./public/images/${artikel.image}`;
    fs.unlinkSync(filepath);
    await Artikel.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({ msg: "Artikel Deleted Successfuly" });
  } catch (error) {
    console.log(error.message);
  }
};
