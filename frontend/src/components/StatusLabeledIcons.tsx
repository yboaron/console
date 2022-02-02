/* Copyright Contributors to the Open Cluster Management project */

import { Flex, FlexItem, Stack } from '@patternfly/react-core'
import {
    CheckCircleIcon,
    ChevronCircleDownIcon,
    ChevronCircleUpIcon,
    MinusCircleIcon,
    QuestionCircleIcon,
} from '@patternfly/react-icons'
import { ReactNode } from 'react'

export function StatusLabeledIcons(props: {
    ready?: number
    low?: number
    medium?: number
    high?: number
    unknown?: number
    readyStatus: string
    readySubtitle: string
    lowStatus: string
    lowSubtitle: string
    mediumStatus: string
    mediumSubtitle: string
    highStatus: string
    highSubtitle: string
    unknownStatus: string
    unknownSubtitle: string
}) {
    const statuses: { key: string; count: number; icon: ReactNode; status: string; subtitle: string }[] = []

    if (props.ready !== undefined && props.ready) {
        statuses.push({
            key: 'ready',
            count: props.ready,
            icon: <CheckCircleIcon color="var(--pf-global--success-color--100)" />,
            status: props.readyStatus,
            subtitle: props.readySubtitle,
        })
    }

    if (props.low !== undefined && props.low) {
        statuses.push({
            key: 'low',
            count: props.low,
            icon: <ChevronCircleDownIcon color="var(--pf-global--warning-color--100)" />,
            status: props.lowStatus,
            subtitle: props.lowSubtitle,
        })
    }
    if (props.medium !== undefined && props.medium) {
        statuses.push({
            key: 'medium',
            count: props.medium,
            icon: (
                <span style={{ position: 'relative' }}>
                    <MinusCircleIcon color="var(--pf-global--warning-color--100)" />
                    <MinusCircleIcon
                        color="var(--pf-global--danger-color--100)"
                        style={{ position: 'absolute', opacity: 0.5, left: 0, top: 2 }}
                    />
                </span>
            ),
            status: props.mediumStatus,
            subtitle: props.mediumSubtitle,
        })
    }
    if (props.high !== undefined && props.high) {
        statuses.push({
            key: 'high',
            count: props.high,
            icon: <ChevronCircleUpIcon color="var(--pf-global--danger-color--100)" />,
            status: props.highStatus,
            subtitle: props.highSubtitle,
        })
    }

    if (props.unknown !== undefined && props.unknown) {
        statuses.push({
            key: 'ready',
            count: props.unknown,
            icon: <QuestionCircleIcon color="var(--pf-global--icon--Color--light)" />,
            status: props.unknownStatus,
            subtitle: props.unknownSubtitle,
        })
    }

    return (
        <Flex justifyContent={{ default: 'justifyContentSpaceAround' }} style={{ rowGap: 24 }}>
            {statuses.map(({ key, icon, status, subtitle }) => (
                <Flex key={key}>
                    <FlexItem>{icon}</FlexItem>
                    <Stack style={{ textAlign: 'left' }}>
                        <a href="#">{status}</a>
                        <span>{subtitle}</span>
                    </Stack>
                </Flex>
            ))}
        </Flex>
    )
}