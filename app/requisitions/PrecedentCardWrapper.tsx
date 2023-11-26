import { FC, Suspense } from 'react';

interface PrecedentCardWrapperProps {
    // Define your props here
}

const PrecedentCardWrapper: FC<PrecedentCardWrapperProps> = () => {
    const precedentsQuery = /* Your query to fetch precedents */;

    return (
        <div>
            <h1>Precedent Card Wrapper</h1>
            <Suspense fallback={<div>Loading...</div>}>
                {/* Your code to fetch precedents using the query */}
            </Suspense>
        </div>
    );
};

export default PrecedentCardWrapper;
