'use client';

import React, { useState } from 'react';
import Button from '@/components/ui/Button';
import LeadModal from '../ui/LeadModal';
import { HiShoppingCart, HiChip } from 'react-icons/hi';

interface PurchaseButtonProps {
    projectTitle: string;
    variant?: 'primary' | 'outline' | 'accent';
    size?: 'sm' | 'md' | 'lg';
    className?: string;
    iconType?: 'cart' | 'chip';
}

const PurchaseButton = ({ projectTitle, variant = 'primary', size = 'lg', className = '', iconType = 'cart' }: PurchaseButtonProps) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            <Button
                variant={variant}
                size={size}
                className={className}
                rightIcon={iconType === 'cart' ? <HiShoppingCart /> : <HiChip />}
                onClick={() => setIsModalOpen(true)}
            >
                {variant === 'accent' ? 'Buy Now' : 'Buy Source Code'}
            </Button>

            <LeadModal
                type="PROJECT_PURCHASE"
                title={projectTitle}
                subtitle="Purchase Project"
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </>
    );
};

export default PurchaseButton;
