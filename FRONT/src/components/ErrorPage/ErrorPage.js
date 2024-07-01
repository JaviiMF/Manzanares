// src/ErrorPage.js
import React from 'react';

function ErrorPage() {
    return (
        <div>
            <h1>Error</h1>
            <p>Ha ocurrido un error. No tiene los permisos necesarios.</p>
            <img src="/images/Error/AccessDenied.webp" alt="Error" />
        </div>
    );
}

export default ErrorPage;