import { useState, useEffect } from 'react';

export const useFeedback = (itemId: string) => {
    const [isHelpful, setIsHelpful] = useState<boolean | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [hasSubmitted, setHasSubmitted] = useState(false);

    // 1. On mount, check localStorage to see if user already rated this item
    useEffect(() => {
        const storedFeedback = localStorage.getItem(`feedback_${itemId}`);
        if (storedFeedback !== null) {
            // Parse the stored value ("true" or "false")
            const parsedValue = storedFeedback === 'true';
            setIsHelpful(parsedValue);
            setHasSubmitted(true);
        }
    }, [itemId]);

    // 2. Handle click
    const handleFeedbackClick = async (value: boolean) => {
        if (hasSubmitted) return; // Prevent double submission

        setIsLoading(true);
        setIsHelpful(value);

        try {
            // 3. Send to backend
            await fetch('/api/feedback', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    itemId, isHelpful: value
                })
            })

            // 4. Save to localStorage ONLY after successful backend response
            localStorage.setItem(`feedback_${itemId}`, value.toString());
            setHasSubmitted(true);
        } catch (error) {
            console.error('Failed to submit feedback', error);
            // Optional: Revert state if API fails
            setIsHelpful(null);
            setHasSubmitted(false);
            alert('Could not save feedback. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return { isHelpful, hasSubmitted, isLoading, handleFeedbackClick };
};