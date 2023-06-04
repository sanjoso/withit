import { useEffect, useRef, useState } from "react";

export function useClickOutsideHook(ref) {
	const [clickedOutside, setClickedOutside] = useState(false);

	useEffect(() => {
		function handleClickOutside(event) {
			if (ref.current && !ref.current.contains(event.target)) {
				setClickedOutside(true);
			}
		}

		window.addEventListener("mousedown", handleClickOutside);
		return () => {
			window.removeEventListener("mousedown", handleClickOutside);
		};
	}, [ref]);

	return clickedOutside;
}
