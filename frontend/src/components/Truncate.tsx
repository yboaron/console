/* Copyright Contributors to the Open Cluster Management project */
import { Tooltip, TooltipPosition } from '@patternfly/react-core'
import React from 'react'
import './Truncate.css'

export enum TruncatePosition {
    start = 'start',
    end = 'end',
    middle = 'middle',
}

const truncateStyles = {
    start: 'pf-c-truncate__end',
    end: 'pf-c-truncate__start',
}

const minWidthCharacters = 12

interface TruncateProps extends React.HTMLProps<HTMLSpanElement> {
    /** Class to add to outer span */
    className?: string
    /** Text to truncate */
    content: string
    /** The number of characters displayed in the second half of the truncation */
    trailingNumChars?: number
    /** Where the text will be truncated */
    position?: 'start' | 'middle' | 'end'
    /** Tooltip position */
    tooltipPosition?:
        | TooltipPosition
        | 'auto'
        | 'top'
        | 'bottom'
        | 'left'
        | 'right'
        | 'top-start'
        | 'top-end'
        | 'bottom-start'
        | 'bottom-end'
        | 'left-start'
        | 'left-end'
        | 'right-start'
        | 'right-end'
}

const sliceContent = (str: string, slice: number) => [str.slice(0, str.length - slice), str.slice(-slice)]

export const Truncate: React.FunctionComponent<TruncateProps> = ({
    className,
    position = 'end',
    tooltipPosition = 'top',
    trailingNumChars = 7,
    content,
    ...props
}: TruncateProps) => (
    <Tooltip position={tooltipPosition} content={content}>
        <span className={`${className} pf-c-truncate`} {...props}>
            {(position === TruncatePosition.end || position === TruncatePosition.start) && (
                <span className={truncateStyles[position]}>
                    {content}
                    {position === TruncatePosition.start && <React.Fragment>&lrm;</React.Fragment>}
                </span>
            )}
            {position === TruncatePosition.middle &&
                content.slice(0, content.length - trailingNumChars).length > minWidthCharacters && (
                    <React.Fragment>
                        <span className={truncateStyles.start}>{sliceContent(content, trailingNumChars)[0]}</span>
                        <span className={truncateStyles.end}>{sliceContent(content, trailingNumChars)[1]}</span>
                    </React.Fragment>
                )}
            {position === TruncatePosition.middle &&
                content.slice(0, content.length - trailingNumChars).length <= minWidthCharacters &&
                content}
        </span>
    </Tooltip>
)
Truncate.displayName = 'Truncate'
