import React, { Fragment } from "react";
import RegularTable from "components/RegularTable/RegularTable";
import { IColumn } from "components/Table/types";
import useDataGetter from "hooks/useDataGetter";
import { endpoints } from "../../../../appConstants";
import Loading from "components/Loading/Loading";
import { loginAndLogoutUser } from "../meta/parser";
import { useMemo } from "react";
import { useCallback } from "react";

const UserStory = () => {
  const columns: IColumn[] = [
    {
      field: "LoginDate",
      header: "تاریخ",
      sort: "desc",
    },
    {
      field: "LoginTime",
      header: "ساعت",
      sort: "desc",
    },
    {
      field: "IpAddress",
      header: "IP",
      sort: "desc",
    },
    {
      field: "Status",
      header: "وضعیت",
      sort: "desc",
    },
  ];

  const { data, loading, fetch } = useDataGetter({
    url: endpoints.story.getDataLoginAndLogout,
    params: {
      page: 0,
      limit: 7
    }
  });
  const userEntry = useMemo(() => data?.data ?? [], [data]);
  const finalData = useMemo(() => loginAndLogoutUser(userEntry), [userEntry]);

  const handlePageChange = useCallback((page: number) => {
    fetch({
      page
    })
  }, [fetch])

  return (
    <Fragment>
      {loading && <Loading />}
      <RegularTable onPageChange={handlePageChange} columns={[] && columns} data={finalData} />
    </Fragment>
  );
};
export default UserStory;
