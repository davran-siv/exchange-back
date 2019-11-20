export class AdCategoryResponseDTO {
  id: string
  name: string
  parent?: AdCategoryResponseDTO
}

export class AdCategoryCreateDTO {
  name: string
  parentId?: string
}

export class AdCategoryUpdateDTO {
  id: string
  name?: string
  parentId?: string
}

export class AdCategoryEntityLikeDTO {
  id?: string
  name?: string
  parentId?: string
}
