// Password hash (SHA-256 of the actual password)
// This is more secure than storing plain text - the actual password isn't visible
const PASSWORD_HASH = 'e83664255c6963e962bb20f9fcfaad1b570ddf5da69f5444ed37e5260f3ef689';

// Hash function using Web Crypto API
async function hashPassword(password) {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

// Verify password against stored hash
async function verifyPassword(input) {
    const inputHash = await hashPassword(input);
    return inputHash === PASSWORD_HASH;
}
