import { useState, useRef, useEffect } from 'react';

export const Popover = ({
  trigger,
  content,
  side = 'bottom',
  align = 'center'
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const popoverRef = useRef(null);
  const triggerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(event.target) &&
        !triggerRef.current?.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="popover-root">
      <div
        ref={triggerRef}
        className="popover-trigger"
        onClick={() => setIsOpen(!isOpen)}
      >
        {trigger}
      </div>

      {isOpen && (
        <div
          ref={popoverRef}
          className={`popover-content ${side} ${align}`}
          role="dialog"
          aria-hidden={!isOpen}
        >
          {content}
        </div>
      )}
    </div>
  );
};