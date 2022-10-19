import React from "react";
import {
  Typography,
  Grid,
  TextField,
  Card,
  Button,
  Paper,
  Table,
  TableBody,
  TableHead,
  TablePagination,
  TableFooter,
  TableCell,
  TableRow,
  TableContainer,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  AccordionActions,
  unstable_useId,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useEffect } from "react";
import axios from "axios";
import userEvent from "@testing-library/user-event";

function Dashboard() {
  const [getToken, setGetToken] = React.useState("");
  const [diaries, setDiaries] = React.useState([]);
  const [detailDiaries, setDetailDiaries] = React.useState([]);
  const [title, setTitle] = React.useState("");
  const [content, setContent] = React.useState("");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [search, setSearch] = React.useState("");
  const [openDetail, setOpenDetail] = React.useState(false);
  const [openAdd, setOpenAdd] = React.useState(false);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleOpenDetail = (data) => {
    setDetailDiaries(data);
    setTitle(data.title);
    setContent(data.content);
    setOpenDetail(true);
  };
  const handleCloseDetail = () => {
    setDetailDiaries([]);
    setTitle("");
    setContent("");
    setOpenDetail(false);
  };
  const handleOpenAdd = () => {
    setOpenAdd(true);
  };
  const handleCloseAdd = () => {
    setOpenAdd(false);
  };

  useEffect(() => {
    setGetToken(localStorage.getItem("token"));

    axios({
      url: "https://private-anon-c249613a27-halfwineaid.apiary-mock.com/diary",
      method: "GET",
      headers: {
        Authorization: "Bearer " + getToken,
      },
    })
      .then(({ data }) => {
        setDiaries(data);
      })
      .catch((err) => {
        console.log("error axios:", err.response);
      });
  }, []);

  const addDiary = (event) => {
    event.preventDefault();

    axios({
      url: "https://private-anon-c249613a27-halfwineaid.apiary-mock.com/diary",
      method: "POST",
      data: {
        id: JSON.parse(localStorage.getItem("token")).user.id,
        title,
        content,
        created_at: new Date(),
      },
    })
      .then(({ data }) => {
        const newData = diaries;
        const test = JSON.parse(data)
        console.log("test:", test);
        newData.push(data)
        // setDiaries(newData)
        // console.log("new data is:", diaries)
      })
      .catch((err) => {
        console.log("error axios", err);
      });
  };
  const editDiary = (event) => {
    event.preventDefault();

    axios({
      url: "https://private-anon-c249613a27-halfwineaid.apiary-mock.com/diary/diary_id",
      method: "PUT",
      data: {        
        title,
        content,
        created_at: new Date(),
      },
    })
      .then(({ data }) => {
        const newData = diaries;
        const test = JSON.parse(data)
        console.log("test:", test);
        newData.push(data)
        // setDiaries(newData)
        // console.log("new data is:", diaries)
      })
      .catch((err) => {
        console.log("error axios", err);
      });
  };

  return (
    <div>
      <Grid
        container
        direction={"row"}
        justifyContent="center"
        alignItems={"center"}
        spacing={1}
      >
        <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
          <Paper style={{ marginTop: "5vw", padding: "15px" }} elevate={4}>
            <Button
              startIcon={<AddIcon />}
              variant="contained"
              onClick={() => handleOpenAdd()}
              style={{ float: "right" }}
            >
              ADD
            </Button>
            <Typography textAlign={"center"} variant="h3">
              DIARIES
            </Typography>
            <TextField
              label="Search"
              value={search}
              onChange={(event) => {
                setSearch(event.target.value);
              }}
              style={{ width: "100%" }}
            />
            <Paper
              sx={{
                width: "100%",
                overflow: "hidden",
                backgroundColor: "#fff",
              }}
            >
              <TableContainer sx={{ maxHeight: 440, backgroundColor: "#fff" }}>
                <Table
                  stickyHeader
                  aria-label="sticky table"
                  sx={{ backgroundColor: "#fff" }}
                >
                  <TableHead sx={{ backgroundColor: "#fff" }}>
                    <TableRow>
                      <TableCell align="center">Title</TableCell>
                      <TableCell align="center">Created_at</TableCell>
                      <TableCell align="center">Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {(rowsPerPage > 0
                      ? diaries
                          .filter((data) => {
                            if (search == "") {
                              return data;
                            } else if (
                              data.title
                                .toLowerCase()
                                .includes(search.toLowerCase())
                            ) {
                              return data;
                            }
                          })
                          .slice(
                            page * rowsPerPage,
                            page * rowsPerPage + rowsPerPage
                          )
                      : diaries
                    ).map((data, key) => {
                      return (
                        <TableRow hover role="checkbox" tabIndex={-1} key={key}>
                          <TableCell align="center">{data.title}</TableCell>
                          <TableCell align="center">
                            {new Date(data.created_at)
                              .toUTCString()
                              .substring(0, 16)}
                          </TableCell>
                          <TableCell align="center">
                            <Button
                              variant="contained"
                              style={{ float: "center" }}
                              onClick={() => {
                                handleOpenDetail(data);
                              }}
                            >
                              Detail
                            </Button>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[]}
                component="div"
                count={diaries.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </Paper>
          </Paper>
        </Grid>
      </Grid>
      <Dialog
        onClose={handleCloseDetail}
        aria-labelledby="customized-dialog-title"
        open={openDetail}
        fullWidth={false}
        maxWidth={false}
        style={{ margin: "3vw" }}
      >
        <DialogTitle>DETAIL</DialogTitle>
        <DialogContent>
          <Accordion expanded={true}>
            <AccordionSummary>DIARY DETAIL</AccordionSummary>
            <AccordionDetails>
              <Grid
                container
                direcition="row"
                justifyContent={"center"}
                alignItems="center"
                spacing={2}
              >
                <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                  <TextField
                    label="Title"
                    value={title}
                    onChange={(event) => {
                      setTitle(event.target.value);
                    }}
                    style={{ width: "100%" }}
                  />
                </Grid>
                <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                  <TextField
                    multiline
                    label="Content"
                    value={content}
                    onChange={(event) => {
                      setContent(event.target.value);
                    }}
                    style={{ width: "100%" }}
                  />
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={handleCloseDetail}>
            Close
          </Button>
          <form method="post" onSubmit={editDiary}>
          <Button variant="contained" type="submit">Save Changes</Button>
          </form>
        </DialogActions>
      </Dialog>
      <Dialog
        onClose={handleCloseAdd}
        aria-labelledby="customized-dialog-title"
        open={openAdd}
        fullWidth={false}
        maxWidth={false}
        style={{ margin: "3vw" }}
      >
        <DialogTitle>ADD</DialogTitle>
        <DialogContent>
          <Accordion expanded={true}>
            <AccordionSummary>ADD DIARY</AccordionSummary>
            <AccordionDetails>
              <Grid
                container
                direcition="row"
                justifyContent="center"
                alignItems="center"
                spacing={2}
              >
                <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                  <TextField
                    label="Title"
                    value={title}
                    onChange={(event) => {
                      setTitle(event.target.value);
                    }}
                    style={{ width: "100%" }}
                  />
                </Grid>
                <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                  <TextField
                    multiline
                    label="Content"
                    value={content}
                    onChange={(event) => {
                      setContent(event.target.value);
                    }}
                    style={{ width: "100%" }}
                  />
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>
        </DialogContent>
        <DialogActions
          spacing={1}
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <Button
            variant="contained"
            onClick={handleCloseAdd}
            style={{ marginRight: "10px" }}
          >
            Close
          </Button>
          <form method="post" onSubmit={addDiary}>
            <Button type="submit" variant="contained">
              Save Changes
            </Button>
          </form>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Dashboard;
