import React from 'react';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        console.error("ErrorBoundary Caught Error:", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div style={{ padding: '20px', background: '#330000', color: '#ffaaaa', border: '1px solid #ff0000', borderRadius: '10px', textAlign: 'center' }}>
                    <h2>⚠️ Something went wrong.</h2>
                    <p style={{ fontFamily: 'monospace' }}>{this.state.error && this.state.error.toString()}</p>
                    <button onClick={() => window.location.reload()} style={{ padding: '10px 20px', background: '#ff3333', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer', marginTop: '10px' }}>
                        RELOAD SYSTEM
                    </button>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
