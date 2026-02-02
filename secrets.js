// Authentication module - IIFE with anti-debugging
(function() {
    'use strict';

    const _cfg = {
        s: 'adidesai-portfolio-2025-xK9mP2',
        i: 150000,
        l: 32,
        h: '3715c241670eb724c2c52f2b263db73deac3fedb6212c17dc29349419dabe87b'
    };

    const _tp = ['a7', 'f2', 'c9', 'e1', 'd4', 'b8'];

    // Max time for entire verify operation (stepping through would exceed this)
    const _maxTime = 8000;

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

    // Constant-time comparison (prevents timing attacks, harder to breakpoint)
    function _ct(a, b) {
        if (a.length !== b.length) return 0;
        let r = 0;
        for (let i = 0; i < a.length; i++) {
            r |= a.charCodeAt(i) ^ b.charCodeAt(i);
        }
        return r;
    }

    async function _verify(input) {
        const t0 = Date.now();
        let result = false;
        let token = null;

        try {
            const hash = await _derive(input);
            const t1 = Date.now();

            // Timing check: if we got here too slow, someone is debugging
            if (t1 - t0 > _maxTime) {
                return false;
            }

            // Constant-time comparison returns 0 if equal
            const diff = _ct(hash, _cfg.h);

            // Build result indirectly - not a simple if/return
            const correct = (diff === 0) ? 1 : 0;
            const arr = [false, _tp.join('')];
            token = arr[correct];

            // Second timing gate
            if (Date.now() - t0 > _maxTime) {
                return false;
            }

            result = token;
        } catch {
            result = false;
        }

        // Final timing gate - any breakpoint stepping will fail this
        if (Date.now() - t0 > _maxTime) {
            return false;
        }

        return result;
    }

    Object.defineProperty(window, 'verifyPassword', {
        value: Object.freeze(_verify),
        writable: false,
        configurable: false,
        enumerable: false
    });

    Object.freeze(_cfg);
    Object.freeze(_tp);
})();
