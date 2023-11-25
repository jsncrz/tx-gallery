export interface SelectItem { 
    label?: string, 
    value?: string ,
    group?: string,
    subGroups?: SelectItem[]
}