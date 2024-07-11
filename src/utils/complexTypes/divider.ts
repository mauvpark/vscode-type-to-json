/**
 * Divide multiple types
 */
export default (text: string) => {
  const typeList = text.split(/(export)?( )?interface|type/g).filter((v) => {
    const trimmed = v?.trim();
    return trimmed !== "export" && !!trimmed?.length;
  });
  return typeList;
};
