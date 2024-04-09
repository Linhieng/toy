interface AllProps {
    props: string
    href: string
    url: string
    nonStandard: boolean
    deprecated: boolean
    experimental: boolean
}

interface CssProps extends AllProps {
    inherit: 'no' | 'yes'
}
