import React, { useRef, useState, useEffect } from "react";
import RsInput from "./RsInput";
import { Box, Button, Container, Grid, Typography, filledInputClasses } from "@mui/material";
import RsNumberFormat from "./RsNumberFormat";
import RsRadioGroup from "./RsRadioGroup";
import RsDropdown from "./RsDropdown";
import RsCheckbox from "./RsCheckbox";
import axios from "axios";
import "@fontsource/raleway"; // Defaults to weight 400
import "@fontsource/raleway/400.css"; // Specify weight
import "@fontsource/raleway/400-italic.css"; // Specify weight and style

// Component map to resolve JSON types to React components

// The form renderer component
function ClothesForm(props) {
  const [formValues, setFormValues] = useState({
    checkboxFixedPrice: false,
    shopName: "",
    shopOwner: "",
    shopRecommendation: "",
    radioGender: "numberAge",
    dropGarmentType: "",
    radioSize: "",
    numberFinalPrice: "",
  });

  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const endpoint = urlParams.get('e') ?? 'clv76u42u0008lgmpa0sv2lhw';
  const beneficiary = urlParams.get('b') ?? '2LrZitixINmF2LnYsdmI2YE';

  const FormElement = useRef(null);
  const FormPayload = useRef(null);
  const [submitting, setSubmitting] = useState(false);
  const [total, setTotal] = useState(0);
  const [pieces, setPieces] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (!pieces) {
      setTotal(0);
    } else {
      setTotal(pieces.reduce((acc, piece) => (parseFloat(acc) || 0 ) + (parseFloat(piece.numberFinalPrice) || 0), 0));
    }
  }, [pieces]);

  const handleChange = (key, value) => {
    setFormValues((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const ComponentMap = {
    RsInput: ({ props, key, schema }) => (
      <RsInput
        label={props.label.value}
        value={formValues[key]}
        errorMessage={schema.validations[0].args.message}
        onChange={handleChange}
        type={schema.type}
        key={key}
      />
    ),
  };

  // Handle form submission
  const validate = () => {
    const validated = Object.entries(formValues).every(([key, value]) => {
      if (typeof value === "string") {
        return value.trim() !== "";
      }
      return true;
    });
    if (!validated) {
      setError("بعض المعلومات الضرورية غائبة");
    } else {
      setPieces((prevPieces) => [...prevPieces, formValues]);
      setSuccess("انضافت القطعة");
      // setFormValues({'checkboxFixedPrice': false, "shopName":"",
      // "shopOwner":"", "shopRecommendation": "", "radioGender": "numberAge", "dropGarmentType": "",
      // "radioSize":"" , "numberFinalPrice":""})
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(pieces);

    setSubmitting(true);
    FormElement.current.submit();

    // try {
    //   const response = await axios.post(
    //     `https://forms.palcollective.com/f/${endpoint}`,
    //     { pieces }
    //   );

    //   console.log("API call successful:", response.data);
    //   window.alert('انبعث الطلب وسنتواصل معك لتأكيد الدفع!');

    //   setPieces([]);
    // } catch (error) {

    //   console.error("API call failed:", error);
    //   window.alert('صارت مشكلة. جرب مرة ثانية.');
    // }
  };

  // Recursive function to render form components
  const renderComponents = (component) => {
    if (component === undefined) return <></>;

    if (component.type === "RsInput") {
      if (
        component.props.label.value === "الوصف" &&
        formValues["dropGarmentType"] !== "شي آخر"
      ) {
        return <></>;
      } else {
        return (
          <RsInput
            id={component.key}
            label={component.props.label.value}
            value={formValues[component.key]}
            errorMessage={component.schema.validations[0].args.message}
            onChange={handleChange}
            placeholder={
              component.props.placeholder
                ? component.props.placeholder.value
                : ""
            }
          />
        );
      }
    } else if (component.type === "RsNumberFormat") {
      if (
        component.key === "numberExactSize" &&
        formValues["radioSize"] !== "مقاس محدد"
      ) {
        return <></>;
      } else if (
        component.key === "numberPrice" &&
        formValues["checkboxFixedPrice"]
      ) {
        <></>;
      } else {
        return (
          <RsNumberFormat
            id={component.key}
            label={component.props.label.value}
            value={formValues[component.key]}
            errorMessage={component.schema.validations[0].args.message}
            onChange={handleChange}
            suffix={component.props.suffix ? component.props.suffix.value : ""}
            placeholder={
              component.props.placeholder
                ? component.props.placeholder.value
                : ""
            }
          />
        );
      }
    } else if (component.type === "RsRadioGroup") {
      console.log(component.props.items.value);
      return (
        <RsRadioGroup
          id={component.key}
          value={formValues[component.key]}
          label={component.props.label.value}
          items={component.props.items.value}
          onChange={handleChange}
        />
      );
    } else if (component.type === "RsDropdown") {
      return (
        <RsDropdown
          id={component.key}
          value={formValues[component.key]}
          label={component.props.label.value}
          items={component.props.data.value}
          onChange={handleChange}
          placeholder={
            component.props.placeholder ? component.props.placeholder.value : ""
          }
        />
      );
    } else if (component.type === "RsCheckbox") {
      return (
        <RsCheckbox
          id={component.key}
          value={formValues[component.key]}
          label={component.props.children.value}
          onChange={handleChange}
        />
      );
    } else if (component.key === "Header") {
      return (
        <Typography
          style={{
            fontSize: "35px",
            fontWeight: 600,
            color: "black",
            textAlign: "center",
            marginRight: "15px",
            marginLeft: "15px",
            marginBottom: "5px",
          }}
        >
          {" "}
          {component.props.content.value}
        </Typography>
      );
    } else if (component.key === "headingGarments") {
      return (
        <Typography
          style={{
            fontSize: "27px",
            fontWeight: 600,
            color: "black",
            textAlign: "right",
            marginRight: "15px",
            marginBottom: "5px",
          }}
        >
          {" "}
          القطع المطلوبة
        </Typography>
      );
    } else if (component.key === "Email hint") {
      return (
        <Typography
          style={{
            fontSize: "18px",
            fontWeight: 500,
            color: "black",
            textAlign: "center",
            marginRight: "15px",
            marginLeft: "15px",
            marginBottom: "15px",
          }}
        >
          {" "}
          {component.props.text.value}
        </Typography>
      );
    } else if (component.key === "Main container") {
      return (
        <Grid
          container
          spacing={2}
          sx={{ backgroundColor: "#f5f5f5", p: 3, fontWeight: 550 }}
        >
          {component.children.map((comp) => (
            <Grid item xs={12}>
              {renderComponents(comp)}
            </Grid>
          ))}
        </Grid>
      );
    } else if (
      component.key === "Name container" ||
      component.key === "variablePriceContainer"
    ) {
      return (
        <Grid
          container
          spacing={2}
          sx={{ backgroundColor: "white", fontWeight: "bold" }}
        >
          {component.children.map((comp) => (
            <Grid item xs={6}>
              {renderComponents(comp)}
            </Grid>
          ))}
        </Grid>
      );
    } else if (
      component.key === "sexAgeContainer" ||
      component.key === "sizeContainer" ||
      component.type === "garmentContainer"
    ) {
      return (
        <Grid
          container
          width={"99.5%"}
          spacing={2}
          flexDirection={"row-reverse"}
          sx={{
            marginLeft: "0.5px",
            marginBottom: "10px",
            backgroundColor: "white",
            borderRadius: "10px",
            p: 3,
            boxShadow: "2px 5px 10px rgba(0,0,0,0.3)",
          }}
        >
          {component.children.map((comp) => (
            <Grid item xs={6}>
              {renderComponents(comp)}
            </Grid>
          ))}
        </Grid>
      );
    } else if (component.key === "errorMessage") {
      return (
        <Typography
          textAlign="right"
          color={"red"}
          sx={{ marginRight: "20px" }}
        >
          {error}
        </Typography>
      );
    } else if (component.key === "successMessage") {
      return (
        <Typography
          textAlign="right"
          color="green"
          sx={{ marginRight: "20px" }}
        >
          {success}
        </Typography>
      );
    } else if (component.key === "Save button") {
      return (
        <Box sx={{ marginRight: "10px" }}>
          <Button
            fullWidth
            color="success"
            sx={{
              fontWeight: 550,
              backgroundColor: "white",
              boxShadow: "2px 5px 10px rgba(0,0,0,0.3)",
              border: "2px solid green",
              "&:hover": {
                border: "2px solid green",
                backgroundColor: "#00994610",
              },
            }}
            variant="outlined"
            onClick={validate}
          >
            ضيف قطعة
          </Button>
        </Box>
      );
    } else if (component.key === "RsButton 1") {
      return (
        <Box
          textAlign={"right"}
          sx={{
            marginRight: "20px",
            boxShadow: "2px 5px 10px rgba(0,0,0,0.3)",
          }}
        >
          <Button
            fullWidth
            variant="contained"
            color="success"
            onClick={handleSubmit}
            sx={{ fontWeight: 550 }}
          >
            حجزنا الملابس وتوكلنا على الله
          </Button>
        </Box>
      );
    } else if (component.key === "RsMessage 1") {
      return (
        <Box
          sx={{
            p: 3,
            backgroundColor: "white",
            boxShadow: "2px 5px 10px rgba(0,0,0,0.3)",
            border: "2px solid green",
            textAlign: "right",
            marginRight: "20px",
            borderRadius: "5px",
          }}
        >
          <Typography sx={{ fontSize: "25px", fontWeight: 600 }}>
            المبلغ الإجمالي للملابس المحجوزة
          </Typography>

          {formValues["numberFinalPrice"] !== "" && (
            <>
              <Typography
                sx={{ fontSize: "25px", fontWeight: 600, color: "green" }}
              >
                <span dir="rtl">شيكل</span>
                {" " + total }
              </Typography>
            </>
          )}
          {formValues["numberFinalPrice"] === "" && (
            <>
              <Typography
                sx={{ fontSize: "25px", fontWeight: 600, color: "green" }}
              >
                <span dir="rtl">شيكل</span>
                ...
              </Typography>
            </>
          )}
        </Box>
      );
    } else if (component.children !== undefined) {
      return (
        <Grid
          spacing={2}
          container
          width={"99.5%"}
          sx={{
            marginLeft: "0.5px",
            marginBottom: "10px",
            backgroundColor: "white",
            borderRadius: "10px",
            p: 3,
            boxShadow: "2px 5px 10px rgba(0,0,0,0.3)",
          }}
        >
          {component.children.map((comp) => (
            <Grid item xs={12}>
              {renderComponents(comp)}
            </Grid>
          ))}
        </Grid>
      );
    } else {
      return <></>;
    }
  };

  const deletePiece = (index) => {
    setPieces(currentPieces => [
      ...currentPieces.slice(0, index),
      ...currentPieces.slice(index + 1)]);
  }

  return (
    <Container fixed sx={{ backgroundColor: "#f5f5f5" }}>
      <form ref={FormElement} action={`https://forms.palcollective.com/f/${endpoint}`} method="POST">
        <input style={{display: 'none'}} name='sum' value={total}></input>
        <input style={{display: 'none'}} name='beneficiary' value={beneficiary}></input>
        <input style={{display: 'none'}} ref={FormPayload} name='payload' value={JSON.stringify(pieces)}></input>
      </form>
      <Grid
        container
        justifyContent="center"
        maxWidth={"100%"}
        spacing={2}
        style={{ margin: "0 auto", backgroundColor: "#f5f5f5" }}
      >
        <>
          {props.formData.form.children.map((component) => (
            <Grid item xs={12}>
              {renderComponents(component)}
            </Grid>
          ))}
        </>
      </Grid>
      <ul style={{direction: 'rtl'}}>
        {
          pieces.map(({radioSize, dropGarmentType, numberFinalPrice}, index) => (
            <li>{dropGarmentType} ({radioSize}): {numberFinalPrice}
            &nbsp;<button onClick={() => deletePiece(index)}>إزالة</button></li>
          ))
        }
      </ul>
     { submitting && <div id='SubmissionScreen'>
        <h1>الرجاء الانتظار</h1>
      </div> }
    </Container>
  );
}

export default ClothesForm;
