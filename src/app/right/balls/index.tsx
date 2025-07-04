// React imports
import { useState, useEffect, useRef } from 'react';

// App imports
import './styles.scss';

export const Balls = ({ cnpjProperties, parcialCounts }: any) => {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const [ containerSize, setContainerSize ] = useState<number>(0);

    useEffect(() => {
        const updateSize = () => {
            if (containerRef.current) {
                const width = containerRef.current.offsetWidth;
                const height = window.innerHeight; // Consider viewport height
                const size = Math.min(width, height) * 1; // 90% of the smallest dimension
                setContainerSize(size);
            }
        };

        // Initialize size and set up a resize event listener
        updateSize();
        window.addEventListener('resize', updateSize);
        return () => window.removeEventListener('resize', updateSize);
    }, []);

    const ballSize = containerSize > 0 ? containerSize / 10 - 7 : 0; // Adjust for gaps

	return (
		<div className="right-component-wrapper" ref={containerRef}>
			<div 
                className="balls"
                style={{ width: containerSize, height: containerSize }}
            >
				{Object.keys(parcialCounts).map((item: string) => {
                    const backgroundColor = cnpjProperties[item].color;
                    const count = parcialCounts[item];
                    return Array.from({ length: count }, (_, index) => (
                        <div
                            key={`${item}-${index}`}
                            style={{
                                backgroundColor,
                                borderRadius: '50%',
                                width: ballSize,
                                height: ballSize,
                            }}
                        />
                    ));
                })}
			</div>
		</div>
	)
}

Balls.displayName="Balls";