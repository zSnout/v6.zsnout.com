import { ref } from "vue";

export default function mediaRef(query: string) {
  let media = matchMedia(query);
  let mediaRef = ref(media.matches);
  media.onchange = () => (mediaRef.value = media.matches);
  return mediaRef;
}
