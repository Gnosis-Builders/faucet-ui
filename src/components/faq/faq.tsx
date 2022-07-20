import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Container } from "@mui/system";
import "./faq.scss";
import { useState } from "react";

const FAQ = () => {
    const [expanded, setExpanded] = useState<string | false>("panel1");

    const handleChange =
        (panel: string) =>
        (event: React.SyntheticEvent, newExpanded: boolean) => {
            setExpanded(newExpanded ? panel : false);
        };

    return (
        <Container maxWidth="sm">
            <Typography
                variant="h3"
                fontFamily="sans-serif"
                fontSize="35px"
                fontWeight="bold"
                align="center"
                marginTop="1em"
            >
                FAQ
            </Typography>
            <Accordion
                className="faq__accordion"
                expanded={expanded === "wiaf"}
                onChange={handleChange("wiaf")}
            >
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography
                        fontFamily="sans-serif"
                        fontSize="16px"
                        fontWeight="bold"
                    >
                        What is a faucet
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography
                        fontFamily="sans-serif"
                        fontSize="16px"
                        align="justify"
                    >
                        A crypto faucet is a tool that distributes small amounts
                        of tokens to perform transactions on a blockchain
                        network. The Gnosis Chain xDAI faucet distributes xDAI
                        to new users so that they may have enough gas to
                        complete a few transactions and interact with
                        applications on Gnosis Chain.
                    </Typography>
                </AccordionDetails>
            </Accordion>

            <Accordion
                className="faq__accordion"
                expanded={expanded === "wix"}
                onChange={handleChange("wix")}
            >
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2a-content"
                    id="panel2a-header"
                >
                    <Typography
                        fontFamily="sans-serif"
                        fontSize="16px"
                        fontWeight="bold"
                    >
                        What is xDAI
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography
                        fontFamily="sans-serif"
                        fontSize="16px"
                        align="justify"
                    >
                        xDai tokens are transactional tokens on the Gnosis Chain
                        and also used to pay for execution of smart contracts
                        and gas fees.
                    </Typography>
                </AccordionDetails>
            </Accordion>

            <Accordion
                className="faq__accordion"
                expanded={expanded === "fuc"}
                onChange={handleChange("fuc")}
            >
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel3a-content"
                    id="panel3a-header"
                >
                    <Typography
                        fontFamily="sans-serif"
                        fontSize="16px"
                        fontWeight="bold"
                    >
                        Faucet usage conditions
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography
                        fontFamily="sans-serif"
                        fontSize="16px"
                        align="justify"
                    >
                        Users who wish to obtain xDAI from the Gnosis Chain
                        faucet must 1. have an xDAI balance below 0.001 and 2.
                        have solved the captcha verification.
                    </Typography>
                </AccordionDetails>
            </Accordion>

            <Accordion
                className="faq__accordion"
                disabled
                expanded={expanded === "wdffcf"}
                onChange={handleChange("wdffcf")}
            >
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel4a-content"
                    id="panel4a-header"
                >
                    <Typography
                        fontFamily="sans-serif"
                        fontSize="16px"
                        fontWeight="bold"
                    >
                        Where do faucet funds come from
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography
                        fontFamily="sans-serif"
                        fontSize="16px"
                        align="justify"
                    ></Typography>
                </AccordionDetails>
            </Accordion>

            <Accordion
                className="faq__accordion"
                expanded={expanded === "hcigmx"}
                onChange={handleChange("hcigmx")}
            >
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel4a-content"
                    id="panel4a-header"
                >
                    <Typography
                        fontFamily="sans-serif"
                        fontSize="16px"
                        fontWeight="bold"
                    >
                        How can I get more xDAI
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        Users who wish to obtain more than 0.001 xDAI have the
                        option to bridge their DAI directly or bridge other
                        ERC-20 tokens from Ethereum mainnet to Gnosis Chain,
                        where they can swap for DAI on any DEX. Users without
                        existing crypto can use a centralized exchange or fiat
                        on-ramp to purchase their DAI. Click here for more
                        information on how to perform any of the above listed
                        activities.
                    </Typography>
                </AccordionDetails>
            </Accordion>
        </Container>
    );
};

export default FAQ;
