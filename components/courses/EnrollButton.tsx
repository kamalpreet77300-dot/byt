'use client';

import React, { useState } from 'react';
import Button from '@/components/ui/Button';
import LeadModal from '../ui/LeadModal';
import { TiLocationArrow } from 'react-icons/ti';

interface EnrollButtonProps {
    courseTitle: string;
    variant?: 'primary' | 'outline' | 'accent';
    size?: 'sm' | 'md' | 'lg';
    className?: string;
    showIcon?: boolean;
}

const EnrollButton = ({ courseTitle, variant = 'primary', size = 'lg', className = '', showIcon = true }: EnrollButtonProps) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            <Button
                variant={variant}
                size={size}
                className={className}
                rightIcon={showIcon ? <TiLocationArrow /> : undefined}
                onClick={() => setIsModalOpen(true)}
            >
                Enroll Now
            </Button>

            <LeadModal
                type="COURSE_ENROLLMENT"
                title={courseTitle}
                subtitle="Enroll Now"
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </>
    );
};

export default EnrollButton;
