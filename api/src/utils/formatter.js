/**
 * Formatter untuk respons API tanpa pagination
 * @param {string} message - Pesan yang akan ditampilkan
 * @param {any} data - Data yang akan dikembalikan
 * @param {number} code - Kode status HTTP (default: 200)
 * @returns {object} - Respons terformat
 */
const formatMessage = (message, data = null, code = 200) => {
  return {
    message,
    code,
    data,
  };
};

/**
 * Formatter untuk respons API dengan pagination
 * @param {string} message - Pesan yang akan ditampilkan
 * @param {any} data - Data yang akan dikembalikan
 * @param {object} pagination - Informasi pagination
 * @param {number} pagination.page - Halaman saat ini
 * @param {number} pagination.limit - Jumlah item per halaman
 * @param {number} pagination.total_data - Total jumlah item
 * @param {number} pagination.total_halaman - Total jumlah halaman
 * @param {number} code - Kode status HTTP (default: 200)
 * @returns {object} - Respons terformat dengan pagination
 */
const formatPaginatedMessage = (
  message,
  data = [],
  pagination = {},
  code = 200
) => {
  return {
    code,
    data: {
      ...data,
      limit: pagination.limit || 10,
      page: pagination.page || 1,
      total_data: pagination.total_data || 0,
      total_halaman: pagination.total_halaman || 0,
    },
    message,
  };
};

module.exports = { formatMessage, formatPaginatedMessage };
