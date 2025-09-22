document.addEventListener('DOMContentLoaded', () => {
    const encryptBtn = document.getElementById('encrypt-btn');
    const decryptBtn = document.getElementById('decrypt-btn');
    const encryptInput = document.getElementById('encrypt-input');
    const decryptInput = document.getElementById('decrypt-input');
    const encryptOutput = document.getElementById('encrypt-output');
    const decryptOutput = document.getElementById('decrypt-output');
    
    // IMPORTANT: Paste your API Gateway Invoke URL here
    const apiUrl = 'https://xxxxxxxxx.execute-api.us-east-1.amazonaws.com/prod/crypto';

    async function handleRequest(action, data, outputElement) {
        if (!data) {
            outputElement.textContent = 'Error: Input cannot be empty.';
            return;
        }

        outputElement.textContent = 'Processing...';

        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ action, data })
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.error || 'An unknown error occurred.');
            }

            outputElement.textContent = result.result;

        } catch (error) {
            outputElement.textContent = `Error: ${error.message}`;
        }
    }

    encryptBtn.addEventListener('click', () => {
        handleRequest('encrypt', encryptInput.value, encryptOutput);
    });

    decryptBtn.addEventListener('click', () => {
        handleRequest('decrypt', decryptInput.value, decryptOutput);
    });
});
