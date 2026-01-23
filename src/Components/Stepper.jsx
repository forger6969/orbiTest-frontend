import React, { useState, Children, useRef, useLayoutEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export default function Stepper({
  children,
  initialStep = 1,
  onStepChange = () => {},
  onFinalStepCompleted = () => {},
  stepContainerClassName = '',
  contentClassName = '',
  footerClassName = '',
  backButtonProps = {},
  nextButtonProps = {},
  backButtonText = 'Back',
  nextButtonText = 'Continue',
  disableStepIndicators = false,
  renderStepIndicator,
  canProceed = true,
  isLoading = false,
  ...rest
}) {
  const [currentStep, setCurrentStep] = useState(initialStep);
  const [direction, setDirection] = useState(0);
  const stepsArray = Children.toArray(children);
  const totalSteps = stepsArray.length;
  const isCompleted = currentStep > totalSteps;
  const isLastStep = currentStep === totalSteps;

  const updateStep = newStep => {
    setCurrentStep(newStep);
    if (newStep > totalSteps) onFinalStepCompleted();
    else onStepChange(newStep);
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setDirection(-1);
      updateStep(currentStep - 1);
    }
  };

  const handleNext = () => {
    if (!isLastStep && canProceed) {
      setDirection(1);
      updateStep(currentStep + 1);
    }
  };

  const handleComplete = () => {
    if (canProceed) {
      setDirection(1);
      updateStep(totalSteps + 1);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4 bg-[#e5e7eb5c]" {...rest}>
      {/* Верхняя часть - индикаторы шагов */}
      <div className="w-full max-w-2xl mb-8">
        <div className={`bg-white rounded-2xl shadow-lg p-6 ${stepContainerClassName}`}>
          <div className="flex w-full items-center justify-center">
            {stepsArray.map((_, index) => {
              const stepNumber = index + 1;
              const isNotLastStep = index < totalSteps - 1;
              return (
                <React.Fragment key={stepNumber}>
                  {renderStepIndicator ? (
                    renderStepIndicator({
                      step: stepNumber,
                      currentStep,
                      onStepClick: clicked => {
                        if (clicked > currentStep && !canProceed) return;
                        if (clicked < currentStep || clicked === currentStep) {
                          setDirection(clicked > currentStep ? 1 : -1);
                          updateStep(clicked);
                        }
                      }
                    })
                  ) : (
                    <StepIndicator
                      step={stepNumber}
                      disableStepIndicators={disableStepIndicators}
                      currentStep={currentStep}
                      canProceed={canProceed}
                      onClickStep={clicked => {
                        if (clicked > currentStep && !canProceed) return;
                        if (clicked < currentStep || clicked === currentStep) {
                          setDirection(clicked > currentStep ? 1 : -1);
                          updateStep(clicked);
                        }
                      }}
                    />
                  )}
                  {isNotLastStep && <StepConnector isComplete={currentStep > stepNumber} />}
                </React.Fragment>
              );
            })}
          </div>
        </div>
      </div>

      {/* Нижняя часть - контент с формами */}
      <div className="w-full max-w-2xl">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden relative">
          {/* Loader overlay */}
          {isLoading && (
            <div className="absolute inset-0 bg-white/80 backdrop-blur-sm z-50 flex items-center justify-center">
              <div className="relative">
                <div className="w-16 h-16 border-4 border-gray-200 rounded-full"></div>
                <div className="w-16 h-16 border-4 border-qizil1 border-t-transparent rounded-full animate-spin absolute top-0 left-0"></div>
              </div>
            </div>
          )}

          <StepContentWrapper
            isCompleted={isCompleted}
            currentStep={currentStep}
            direction={direction}
            className={`p-8 ${contentClassName}`}
          >
            {stepsArray[currentStep - 1]}
          </StepContentWrapper>

          {!isCompleted && (
            <div className={`px-8 pb-8 border-t border-gray-100 pt-6 ${footerClassName}`}>
              <div className={`flex items-center ${currentStep !== 1 ? 'justify-between' : 'justify-end'}`}>
                {currentStep !== 1 && (
                  <button
                    onClick={handleBack}
                    disabled={isLoading}
                    className={`rounded-lg px-6 py-2.5 font-medium transition-all duration-300 ${
                      isLoading
                        ? 'opacity-50 cursor-not-allowed text-gray-400'
                        : 'text-gray-600 hover:text-qizil1 hover:bg-red-50'
                    }`}
                    {...backButtonProps}
                  >
                    {backButtonText}
                  </button>
                )}
                <button
                  onClick={isLastStep ? handleComplete : handleNext}
                  disabled={!canProceed || isLoading}
                  className={`rounded-lg py-2.5 px-8 font-medium tracking-tight transition-all duration-300 ${
                    canProceed && !isLoading
                      ? 'bg-qizil1 text-white hover:bg-qizil2 shadow-md hover:shadow-lg transform hover:-translate-y-0.5'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                  {...nextButtonProps}
                >
                  {isLastStep ? 'Complete' : nextButtonText}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function StepContentWrapper({ isCompleted, currentStep, direction, children, className }) {
  const [parentHeight, setParentHeight] = useState(0);

  return (
    <motion.div
      style={{ position: 'relative', overflow: 'hidden' }}
      animate={{ height: isCompleted ? 0 : parentHeight }}
      transition={{ type: 'spring', duration: 0.4 }}
      className={className}
    >
      <AnimatePresence initial={false} mode="sync" custom={direction}>
        {!isCompleted && (
          <SlideTransition key={currentStep} direction={direction} onHeightReady={h => setParentHeight(h)}>
            {children}
          </SlideTransition>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function SlideTransition({ children, direction, onHeightReady }) {
  const containerRef = useRef(null);

  useLayoutEffect(() => {
    if (containerRef.current) onHeightReady(containerRef.current.offsetHeight);
  }, [children, onHeightReady]);

  return (
    <motion.div
      ref={containerRef}
      custom={direction}
      variants={stepVariants}
      initial="enter"
      animate="center"
      exit="exit"
      transition={{ duration: 0.4 }}
      style={{ position: 'absolute', left: 0, right: 0, top: 0 }}
    >
      {children}
    </motion.div>
  );
}

const stepVariants = {
  enter: dir => ({
    x: dir >= 0 ? '100%' : '-100%',
    opacity: 0
  }),
  center: {
    x: '0%',
    opacity: 1
  },
  exit: dir => ({
    x: dir >= 0 ? '-100%' : '100%',
    opacity: 0
  })
};

export function Step({ children }) {
  return <div>{children}</div>;
}

function StepIndicator({ step, currentStep, onClickStep, disableStepIndicators, canProceed }) {
  const status = currentStep === step ? 'active' : currentStep < step ? 'inactive' : 'complete';
  const isClickable = step < currentStep || (step === currentStep && !disableStepIndicators);

  const handleClick = () => {
    if (isClickable) onClickStep(step);
  };

  return (
    <motion.div
      onClick={handleClick}
      className={`relative outline-none focus:outline-none ${isClickable ? 'cursor-pointer' : 'cursor-not-allowed'}`}
      animate={status}
      initial={false}
    >
      <motion.div
        variants={{
          inactive: { scale: 1, backgroundColor: '#d1d5db', color: '#6b7280' },
          active: { scale: 1.15, backgroundColor: '#ef4444', color: '#FFF' },
          complete: { scale: 1, backgroundColor: '#ef4444', color: '#FFF' }
        }}
        transition={{ duration: 0.3 }}
        className="flex h-10 w-10 items-center justify-center rounded-full font-semibold shadow-md"
      >
        {status === 'complete' ? (
          <CheckIcon className="h-5 w-5 text-white" />
        ) : status === 'active' ? (
          <div className="h-3 w-3 rounded-full bg-white" />
        ) : (
          <span className="text-sm">{step}</span>
        )}
      </motion.div>
    </motion.div>
  );
}

function StepConnector({ isComplete }) {
  const lineVariants = {
    incomplete: { width: '100%', backgroundColor: '#d1d5db' },
    complete: { width: '100%', backgroundColor: '#ef4444' }
  };

  return (
    <div className="relative mx-3 h-0.5 flex-1 overflow-hidden rounded bg-gray-300">
      <motion.div
        className="absolute left-0 top-0 h-full"
        variants={lineVariants}
        initial={false}
        animate={isComplete ? 'complete' : 'incomplete'}
        transition={{ duration: 0.4 }}
      />
    </div>
  );
}

function CheckIcon(props) {
  return (
    <svg {...props} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <motion.path
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ delay: 0.1, type: 'tween', ease: 'easeOut', duration: 0.3 }}
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M5 13l4 4L19 7"
      />
    </svg>
  );
}