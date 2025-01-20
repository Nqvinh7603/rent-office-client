import { useEffect, useState } from "react";

const useStickyNavigation = () => {
    const [isSticky, setIsSticky] = useState(false);

    const handleScroll = () => {
        const scrollTop = window.scrollY;
        const stickyThreshold = 72.5;
        setIsSticky(scrollTop > stickyThreshold);
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return isSticky;
};

export default useStickyNavigation;