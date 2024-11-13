import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';

// github search key: path:**/.env anthropic_api_key

import Anthropic from "@anthropic-ai/sdk";
const anthropic = new Anthropic(
    {
        apiKey: "todo",
        dangerouslyAllowBrowser: true
    }
);


const App: React.FC = () => {
    const [inputText, setInputText] = useState<string>('');
    const [response, setResponse] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setInputText(e.target.value);
    };

    const fetchResponse = async () => {
        console.log('Fetching response...');
        console.log(inputText);
        if (!inputText) {
            return;
        }

        setLoading(true);
        try {
            const response = await anthropic.messages.create({
                model: "claude-3-5-sonnet-20241022",
                max_tokens: 1000,
                temperature: 0,
                system: "Respond only with short poems.",
                messages: [
                    {
                        "role": "user",
                        "content": [
                            {
                                "type": "text",
                                "text": inputText
                            }
                        ]
                    }
                ]
            });
            console.log(response);
            // setResponse(response.content[0].);

        } catch (error) {
            console.error('Error:', error);
            setResponse('An error occurred. Please try again later.');
        } finally {
            setLoading(false);
        }

    };

    return (
        <div
            style={{
                padding: '20px',
                fontFamily: 'Arial, sans-serif',
                backgroundColor: '#1e1e1e',
                color: '#e0e0e0',
                minHeight: '100vh'
            }}
        >
            <h2 style={{ color: '#f5f5f5' }}>Simple ChatGPT Markdown Generator</h2>
            <textarea
                placeholder="Enter your prompt..."
                value={inputText}
                onChange={handleInputChange}
                style={{
                    width: '100%',
                    height: '100px',
                    padding: '10px',
                    fontSize: '16px',
                    backgroundColor: '#333333',
                    color: '#f5f5f5',
                    border: '1px solid #555',
                    borderRadius: '4px'
                }}
            />
            <button
                onClick={fetchResponse}
                style={{
                    marginTop: '10px',
                    padding: '10px 20px',
                    fontSize: '16px',
                    backgroundColor: '#007acc',
                    color: '#f5f5f5',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer'
                }}
                disabled={loading}
            >
                {loading ? 'Loading...' : 'Generate'}
            </button>
            <div
                style={{
                    marginTop: '20px',
                    border: '1px solid #555',
                    padding: '10px',
                    backgroundColor: '#2b2b2b',
                    color: '#e0e0e0',
                    borderRadius: '4px'
                }}
            >
                <ReactMarkdown>{response}</ReactMarkdown>
            </div>
        </div>
    );
};

export default App;
