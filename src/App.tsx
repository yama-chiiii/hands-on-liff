import liff from "@line/liff";
import { LiffMockPlugin } from "@line/liff-mock";
import { useEffect, useState } from "react";
import "./App.css";

function App() {
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    liff.use(new LiffMockPlugin());

    useEffect(() => {
        const liffId = import.meta.env.VITE_LIFF_ID;

        const isDev = process.env.NODE_ENV === "development";

        liff.init({
            liffId,
            withLoginOnExternalBrowser: true,
            mock: isDev,
        })
            .then(async () => {
                if (!liff.isInClient()) liff.login();
                const profile = await liff.getProfile();
                setMessage(`Hello,${profile.displayName}!`);
            })
            .catch((e: Error) => {
                setMessage("LIFF init failed.");
                setError(`${e}`);
            });
    });

    return (
        <div className="App">
            <h1>はんずおんちゅーとりある</h1>
            {message && <p>{message}</p>}
            {error && (
                <p>
                    <code>{error}</code>
                </p>
            )}
            <a
                href="https://developers.line.biz/ja/docs/liff/"
                target="_blank"
                rel="noreferrer"
            >
                LIFF Documentation
            </a>
        </div>
    );
}

export default App;
