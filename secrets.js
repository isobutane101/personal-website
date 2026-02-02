// Authentication module - IIFE to prevent global access
(function() {
    'use strict';

    // All constants are private to this closure
    const _cfg = {
        s: 'adidesai-portfolio-2025-xK9mP2',
        i: 150000,
        l: 32,
        h: '3715c241670eb724c2c52f2b263db73deac3fedb6212c17dc29349419dabe87b'
    };

    // Token split into parts - harder to find via simple string search
    const _tp = ['a7', 'f2', 'c9', 'e1', 'd4', 'b8'];

    // Internal derive function - not accessible globally
    async function _derive(p) {
        const e = new TextEncoder();
        const pb = e.encode(p);
        const sb = e.encode(_cfg.s);

        const km = await crypto.subtle.importKey(
            'raw', pb, 'PBKDF2', false, ['deriveBits']
        );

        const db = await crypto.subtle.deriveBits(
            { name: 'PBKDF2', salt: sb, iterations: _cfg.i, hash: 'SHA-256' },
            km, _cfg.l * 8
        );

        return Array.from(new Uint8Array(db)).map(b =>
            b.toString(16).padStart(2, '0')
        ).join('');
    }

    // Store original toString to detect tampering
    const _origFnStr = Function.prototype.toString;

    // Verify function - frozen and tamper-resistant
    async function _verify(input) {
        // Check if this function has been replaced
        if (_origFnStr.call(_verify).indexOf('_derive') === -1) {
            return false;
        }

        try {
            const hash = await _derive(input);
            if (hash === _cfg.h) {
                return _tp.join('');
            }
            return false;
        } catch {
            return false;
        }
    }

    // Expose only verifyPassword, make it non-writable
    Object.defineProperty(window, 'verifyPassword', {
        value: Object.freeze(_verify),
        writable: false,
        configurable: false,
        enumerable: false
    });

    // Clean up any attempts to access internals
    Object.freeze(_cfg);
    Object.freeze(_tp);
})();
