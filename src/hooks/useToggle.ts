import { useCallback, useState } from "react";

function useToggle(): {
    isOpen: boolean,
    setIsOpen: (s: boolean) => void,
    toggle: () => void
} {
    const [isOpen,setIsOpen] = useState<boolean>(false)
    const toggle = useCallback(() => {
        setIsOpen(s => !s)
    }, [])
    return {
        isOpen,
        setIsOpen,
        toggle
    }
}

export default useToggle;