export default function useHelpers() {
  function isObjectEmpty(obj) {
    return Object.keys(obj).length === 0 && obj.constructor === Object;
  }
  return { isObjectEmpty };
}
