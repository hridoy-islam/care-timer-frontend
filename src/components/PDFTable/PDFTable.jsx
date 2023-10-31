"use client";
import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFViewer,
  Font,
} from "@react-pdf/renderer";
import moment from "moment";

Font.register({
  family: "Roboto",
  src: "Times-Roman",
  fontWeight: "normal",
});

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    padding: 20,
  },
  table: {
    display: "table",
    width: "100%",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#bfbfbf",
    marginTop: 10,
  },
  tableRow: {
    flexDirection: "row",
  },
  tableCell: {
    width: "10%",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#bfbfbf",
    padding: 8,
    fontFamily: "Times-Roman",
  },
});

const PDFTable = ({ service }) => {
  return (
    <Document>
      <Page size="SRA0" style={styles.page}>
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <Text
              style={{
                fontWeight: 800,
                width: "10%",
                borderStyle: "solid",
                borderWidth: 1,
                borderColor: "#bfbfbf",
                padding: 8,
                fontSize: 20,
              }}
            >
              Service Name
            </Text>
            <Text
              style={{
                fontWeight: 800,
                width: "10%",
                borderStyle: "solid",
                borderWidth: 1,
                borderColor: "#bfbfbf",
                padding: 8,
                fontSize: 20,
              }}
            >
              Service User
            </Text>
            <Text
              style={{
                fontWeight: 800,
                width: "10%",
                borderStyle: "solid",
                borderWidth: 1,
                borderColor: "#bfbfbf",
                padding: 8,
                fontSize: 20,
              }}
            >
              Service Date
            </Text>
            <Text
              style={{
                fontWeight: 800,
                width: "10%",
                borderStyle: "solid",
                borderWidth: 1,
                borderColor: "#bfbfbf",
                padding: 8,
                fontSize: 20,
              }}
            >
              Service Time Start
            </Text>
            <Text
              style={{
                fontWeight: 800,
                width: "10%",
                borderStyle: "solid",
                borderWidth: 1,
                borderColor: "#bfbfbf",
                padding: 8,
                fontSize: 20,
              }}
            >
              Service Time End
            </Text>
            <Text
              style={{
                fontWeight: 800,
                width: "10%",
                borderStyle: "solid",
                borderWidth: 1,
                borderColor: "#bfbfbf",
                padding: 8,
                fontSize: 20,
              }}
            >
              Team Member
            </Text>
            <Text
              style={{
                fontWeight: 800,
                width: "10%",
                borderStyle: "solid",
                borderWidth: 1,
                borderColor: "#bfbfbf",
                padding: 8,
                fontSize: 20,
              }}
            >
              Duration (H:M:S)
            </Text>
            <Text
              style={{
                fontWeight: 800,
                width: "10%",
                borderStyle: "solid",
                borderWidth: 1,
                borderColor: "#bfbfbf",
                padding: 8,
                fontSize: 20,
              }}
            >
              Worker Login
            </Text>
            <Text
              style={{
                fontWeight: 800,
                width: "10%",
                borderStyle: "solid",
                borderWidth: 1,
                borderColor: "#bfbfbf",
                padding: 8,
                fontSize: 20,
              }}
            >
              Worker Logout
            </Text>
            <Text
              style={{
                fontWeight: 800,
                width: "10%",
                borderStyle: "solid",
                borderWidth: 1,
                borderColor: "#bfbfbf",
                padding: 8,
                fontSize: 20,
              }}
            >
              Comment
            </Text>
          </View>
          {service?.map((item, index) => (
            <View key={index} style={styles.tableRow}>
              <Text style={styles.tableCell}>{item?.serviceName}</Text>
              <Text style={styles.tableCell}>{item?.customer?.name}</Text>
              <Text style={styles.tableCell}>
                {moment(item?.serviceDate).format("DD-MM-YYYY")}
              </Text>
              <Text style={styles.tableCell}>{item?.serviceTimeStart}</Text>
              <Text style={styles.tableCell}>{item?.serviceTimeEnd}</Text>
              <Text style={styles.tableCell}>{item?.worker?.name}</Text>
              <Text style={styles.tableCell}>
                {item?.duration
                  ? `${Math.floor(
                    (item?.duration / (1000 * 60 * 60)) % 24
                  )} : ${Math.floor(
                    (item?.duration / (1000 * 60)) % 60
                  )} : ${Math.floor(
                    (item?.duration / 1000) % 60
                  )} `
                  : "Not Found"}
              </Text>
              <Text style={styles.tableCell}>
                {item?.workerLogin
                  ? moment
                    .tz(item?.workerLogin, "Europe/London")
                    .format("LT")
                  : "Not Found"}
              </Text>
              <Text style={styles.tableCell}>
                {item?.workerLogout
                  ? moment
                    .tz(item?.workerLogout, "Europe/London")
                    .format("LT")
                  : "Not Found"}
              </Text>
              <Text style={styles.tableCell}>
                {item?.comment ? item?.comment : "Not Comment Yet"}
              </Text>
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );
};

export default PDFTable;
