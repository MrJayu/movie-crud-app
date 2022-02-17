import { Button, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { add, deleteById, updateById } from "../ToolKit/Slice/crudSlice";

const Crud = () => {
  const dispatch = useDispatch();
  //redux state
  const list = useSelector((state) => state?.crudSlice.list);

  //state
  const [listItem, setListItem] = useState({});
  const [type, setType] = useState("add");

  //function
  const onChange = (e) => {
    setListItem({ ...listItem, title: e.target.value });
  };

  const onAdd = () => {
    if (type === "add") {
      if (listItem?.title && listItem?.title !== "") {
        let id = list?.map((item) => item.id);
        let obj = {
          id: list.length > 0 ? Math.max(...id) + 1 : 1,
          title: listItem.title,
        };
        dispatch(add(obj));
      }
    } else {
      setType("add");
      dispatch(updateById(listItem));
    }
    setListItem({});
  };

  const onClickItem = (item) => {
    setType("update");
    setListItem(item);
  };

  const onClickDelete = (id) => {
    dispatch(deleteById(id));
  };

  return (
    <div>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          my: 2,
        }}
      >
        <TextField
          hiddenLabel
          id="filled-hidden-label-normal"
          defaultValue={listItem.title ?? ""}
          variant="filled"
          placeholder="Title"
          value={listItem.title ?? ""}
          onChange={onChange}
        />
        <Button onClick={onAdd} variant="text">
          {type === "add" ? "Add" : "Update"}
        </Button>
      </Box>

      {list?.map((item) => {
        return (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography
              variant="h6"
              onClick={() => onClickItem(item)}
              textAlign="center"
              sx={{ cursor: "pointer", mr: 2 }}
            >
              {item.title}
            </Typography>
            <Button onClick={() => onClickDelete(item.id)} variant="text">
              Delete
            </Button>
          </Box>
        );
      })}
    </div>
  );
};
export default Crud;
