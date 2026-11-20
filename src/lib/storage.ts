import { supabase } from './supabase'

// 선택한 이미지 파일을 Supabase Storage(eco-images 버킷)에 업로드하고 공개 URL을 반환합니다.
export async function uploadEcoImage(
  file: File,
  userId: string,
): Promise<string | null> {
  if (!supabase) return null

  const ext = file.name.split('.').pop() || 'jpg'
  const filePath = `${userId}/${Date.now()}.${ext}`

  const { error } = await supabase.storage
    .from('eco-images')
    .upload(filePath, file, { upsert: false })

  if (error) {
    console.error('이미지 업로드 실패:', error.message)
    return null
  }

  const { data } = supabase.storage.from('eco-images').getPublicUrl(filePath)
  return data.publicUrl
}
