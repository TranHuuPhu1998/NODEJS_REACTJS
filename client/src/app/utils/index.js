export const coverListDateToOption = (data) => {
  return data?.map((item) => ({
    label: item.name,
    value: item._id
  }));
}

export const coverItemDataSelect = (item) => {
  return {
    value: item?.id || "",
    label: item?.name || ""
  };
}