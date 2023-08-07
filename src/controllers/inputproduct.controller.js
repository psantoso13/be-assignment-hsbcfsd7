const { inputProduct } = require('../models');
const multer = require('multer');
const path = require('path');
const fs = require('fs'); // Import the fs module

// konfigurasi multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // menentukan folder penyimpanan gambar
    cb(null, 'kulinerpics/');
  },
  filename: function (req, file, cb) {
    // memberi nama file dengan penambahan ekstensi waktu pembuatan
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const extname = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + extname);
  }
});

const upload = multer({ storage }).single('gambar'); // gunakan 'gambar' sebagai input key pada postman

const create = async (req, res) => {
  try {
    // Upload gambar
    upload(req, res, async function (err) {
      if (err) {
        return res.status(400).send({
          message: 'Error uploading the image.',
        });
      }
      

      // konfirmasi pengisian form
      const { nama, keterangan, jumlah } = req.body;
      if (!nama || !keterangan || !jumlah) {
        return res.status(400).send({
          message: 'Some field(s) must be filled and cannot be empty',
        });
      }

      // me-record URL gambar yang diupload
      const imageUrl = req.file.path;

      // mengisi gambar_product dengan alamat gambar
      const input = await inputProduct.create({
        gambar_product: imageUrl,
        nama_product: nama,
        ket_product: keterangan,
        stock_product: jumlah,
      });

      return res.status(201).send({
        message: 'Produk berhasil diunggah!',
      });
    });
  } catch (error) {
    console.log(error);
    return res.send({
      message: 'Error occurred',
      data: error,
    });
  }
};

const lihatProduk = async (req, res) => {
  try {
    const productName = req.params.ambilProduk;

    // mengambil produk dari database dengan acuan nama_produk
    const product = await inputProduct.findOne({
      where: {
        nama_product: productName,
      },
    });

    if (!product) {
      return res.status(404).send({
        message: 'Product not found.',
      });
    }

    // respon data
    const productData = {
      id: product.id, // id dari produk pada tabel
      nama: product.nama_product,
      keterangan: product.ket_product,
      jumlah: product.stock_product,
      imageUrl: product.gambar_product,
    };

    return res.status(200).send({
      message: 'Product found:',
      data: productData,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: 'Error occurred',
      data: error,
    });
  }
};


const hapusProduk = async (req, res) => {
  try {
    const productName = req.params.namaProduk;
    // Check produk
    const product = await inputProduct.findOne({
      where: {
        nama_product: productName,
      },
    });

    if (!product) {
      return res.status(404).send({
        message: 'Product not found',
      });
    }

    // menghapus produk
    await product.destroy();

    // menghapus gambar produk
    const imageFilePath = product.gambar_product;
    fs.unlink(imageFilePath, (err) => {
      if (err) {
        console.error(`Error deleting image file ${imageFilePath}: ${err}`);
      } else {
        console.log(`Image file ${imageFilePath} has been deleted successfully.`);
      }
    });

    return res.send({
      message: 'Product deleted successfully!',
    });
  } catch (error) {
    console.log(error);
    return res.send({
      message: 'Error occurred',
      data: error,
    });
  }
};

const updateProduk = async (req, res) => {
  try {
    const productName = req.params.gantiProduk;

    // melihat apakah produk ada dalam database
    const product = await inputProduct.findOne({
      where: {
        nama_product: productName,
      },
    });

    if (!product) {
      return res.status(404).send({
        message: 'Product not found',
      });
    }

    // Upload gambar 
    upload(req, res, async function (err) {
      if (err) {
        return res.status(400).send({
          message: 'Error uploading the image.',
        });
      }

      // data produk baru yang diinput dari request body
      const { nama, keterangan, jumlah } = req.body;

      // update data produk dari input user
      if (nama) {
        product.nama_product = nama;
      }
      if (keterangan) {
        product.ket_product = keterangan;
      }
      if (jumlah) {
        product.stock_product = jumlah;
      }

      // memperbarui alamat gambar bila ada penggantian
      if (req.file) {
        const imageUrl = req.file.path;
        // menghapus file gambar sebelumnya
        fs.unlink(product.gambar_product, (err) => {
          if (err) {
            console.error(`Error deleting image file ${product.gambar_product}: ${err}`);
          } else {
            console.log(`Image file ${product.gambar_product} has been deleted successfully.`);
          }
        });
        product.gambar_product = imageUrl;
      }

      // menyimpan update dari data yang di input
      await product.save();

      const productData = {
        id: product.id, // id dari produk pada tabel
        nama: product.nama_product,
        keterangan: product.ket_product,
        jumlah: product.stock_product,
        imageUrl: product.gambar_product,
      };

      return res.send({
        message: 'Product updated successfully!',
        data: productData
      });
    });
  } catch (error) {
    console.log(error);
    return res.send({
      message: 'Error occurred',
      data: error,
    });
  }
};

module.exports = { create, hapusProduk, lihatProduk, updateProduk };
