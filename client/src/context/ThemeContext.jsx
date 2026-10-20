import { createContext, useContext, useEffect, useState } from "react";

const STORAGE_KEY = "jj-theme";

const ThemeContext = createContext();

/**
 * Resolves the effective colour-scheme: "light" or "dark".
 * When preference is "system" we check the OS media query.
 */
const resolveEffective = (preference) => {
    if (preference === "dark") return "dark";
    if (preference === "light") return "light";
    return window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
};

export const ThemeProvider = ({ children }) => {
    const [theme, setThemeState] = useState(() => {
        return localStorage.getItem(STORAGE_KEY) || "system";
    });

    const applyTheme = (preference) => {
        const effective = resolveEffective(preference);
        document.documentElement.classList.toggle("dark", effective === "dark");
    };

    // Apply immediately on mount and whenever theme changes
    useEffect(() => {
        applyTheme(theme);
    }, [theme]);

    // Keep "system" preference in sync when the OS setting changes at runtime
    useEffect(() => {
        const mq = window.matchMedia("(prefers-color-scheme: dark)");
        const handler = () => {
            if (theme === "system") applyTheme("system");
        };
        mq.addEventListener("change", handler);
        return () => mq.removeEventListener("change", handler);
    }, [theme]);

    const setTheme = (preference) => {
        localStorage.setItem(STORAGE_KEY, preference);
        setThemeState(preference);
    };

    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => useContext(ThemeContext);
