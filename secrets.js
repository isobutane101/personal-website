// PBKDF2 password verification
// Uses 150,000 iterations making brute-force computationally infeasible
// Salt prevents rainbow table attacks
const SALT = 'adidesai-portfolio-2025-xK9mP2';
const ITERATIONS = 150000;
const HASH_LENGTH = 32;

// Pre-computed PBKDF2 hash of the password with the above parameters
const PASSWORD_HASH = '3715c241670eb724c2c52f2b263db73deac3fedb6212c17dc29349419dabe87b';

// Derive key using PBKDF2
async function deriveKey(password, salt) {
    const encoder = new TextEncoder();
    const passwordBuffer = encoder.encode(password);
    const saltBuffer = encoder.encode(salt);

    const keyMaterial = await crypto.subtle.importKey(
        'raw',
        passwordBuffer,
        'PBKDF2',
        false,
        ['deriveBits']
    );

    const derivedBits = await crypto.subtle.deriveBits(
        {
            name: 'PBKDF2',
            salt: saltBuffer,
            iterations: ITERATIONS,
            hash: 'SHA-256'
        },
        keyMaterial,
        HASH_LENGTH * 8
    );

    const hashArray = Array.from(new Uint8Array(derivedBits));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

// Verify password against stored hash
async function verifyPassword(input) {
    const inputHash = await deriveKey(input, SALT);
    return inputHash === PASSWORD_HASH;
}
