function getInitials(nama) {
  if (!nama || typeof nama !== "string") return "";

  const names = nama.trim().split(/\s+/);

  if (names.length === 0) return "";
  if (names.length === 1) return names[0][0].toUpperCase();

  const first = names[0][0];
  const last = names[names.length - 1][0];
  return (first + last).toUpperCase();
}

// Contoh penggunaan:
console.log(getInitials("Fajar Hidayat")); // Output: "FH"
console.log(getInitials("fajar")); // Output: "F"
console.log(getInitials("Jane Smith")); // Output: "JS"
console.log(getInitials("John Doe Smith")); // Output: "JS"
console.log(getInitials("  Alice  ")); // Output: "A"
console.log(getInitials("")); // Output: ""

module.exports = { getInitials };
