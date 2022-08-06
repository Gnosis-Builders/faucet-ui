import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Container } from "@mui/system";
import "./faq.scss";
import { useState, useEffect, useRef } from "react";

type FAQProps = {
  setOpenGetMoreFaq: (x: () => void) => void;
};

const FAQ = ({ setOpenGetMoreFaq }: FAQProps) => {
    const [expanded, setExpanded] = useState<string | false>("panel1");

    const handleChange =
        (panel: string) =>
        (event: React.SyntheticEvent, newExpanded: boolean) => {
            setExpanded(newExpanded ? panel : false);
        };

    const getMoreFaqRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
      setOpenGetMoreFaq(() => () => {
        setExpanded("hcigmx");
        if (getMoreFaqRef.current !== null) {
          getMoreFaqRef.current.scrollIntoView({ behavior: "smooth", block: "center", inline: "center" });
        }
      });
    }, []);

    return (
        <Container maxWidth="sm">
            <Typography
                fontFamily="GT-Planar"
                fontSize="35px"
                align="center"
                marginTop="1.5em"
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
                        color="white"
                        fontFamily="GT-Planar"
                        fontSize="18px"
                        fontWeight="bold"
                    >
                        What is a faucet
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography
                        fontFamily="GT-Planar-Regular"
                        fontSize="16px"
                        align="justify"
                    >
                        <span id="need-more">
                            A crypto faucet is a tool that distributes small
                            amounts of tokens to perform transactions on a
                            blockchain network. The Gnosis Chain xDAI faucet
                            distributes xDAI to new users so that they may have
                            enough gas to complete a few transactions and
                            interact with applications on Gnosis Chain.
                        </span>
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
                        color="white"
                        fontFamily="GT-Planar"
                        fontSize="18px"
                        fontWeight="bold"
                    >
                        What is xDAI
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography
                        fontFamily="GT-Planar-Regular"
                        fontSize="16px"
                        align="justify"
                    >
                        xDai tokens are transactional tokens on the Gnosis Chain
                        and also used to pay for execution of smart contracts
                        and gas fees. For more information regarding xDAI, visit
                        the{" "}
                        <a
                            target="_blank"
                            rel="noreferrer noopener"
                            href="https://developers.gnosischain.com/for-users/get-xdai-tokens"
                        >
                            {" "}
                            Gnosis Chain documentation.
                        </a>
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
                        color="white"
                        fontFamily="GT-Planar"
                        fontSize="18px"
                        fontWeight="bold"
                    >
                        Faucet usage conditions
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography
                        component={"span"}
                        variant={"body2"}
                        fontFamily="GT-Planar-Regular"
                        fontSize="16px"
                        align="justify"
                    >
                        Users who wish to obtain 0.001 xDAI from the Gnosis Chain
                        faucet must have solved the captcha verification. Users
                        who wish to obtain 0.01 xDAI must complete the previous
                        steps in addition to sending a verification Tweet.
                    </Typography>
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
                    ref={getMoreFaqRef}
                >
                    <Typography
                        color="white"
                        fontFamily="GT-Planar"
                        fontSize="18px"
                        fontWeight="bold"
                    >
                        How can I get more xDAI
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography
                        fontFamily="GT-Planar-Regular"
                        fontSize="16px"
                        align="justify"
                    >
                        If you already own DAI on Ethereum or another bridge
                        compatible EVM compatible chain, you will be able to
                        bridge your DAI to Gnosis Chain and convert it to xDAI.
                        To do so, we recommend using either{" "}
                        <a
                            target="_blank"
                            rel="noreferrer noopener"
                            href="https://bridge.connext.network/DAI-from-ethereum-to-gnosis"
                        >
                            Connext
                        </a>{" "}
                        bridge or{" "}
                        <a
                            target="_blank"
                            rel="noreferrer noopener"
                            href="https://app.hop.exchange/#/send?token=DAI&sourceNetwork=ethereum&destNetwork=gnosis"
                        >
                            Hop
                        </a>{" "}
                        bridge. Users without existing crypto can use a
                        centralized exchange such as{" "}
                        <a
                            target="_blank"
                            rel="noreferrer noopener"
                            href="https://ascendex.com/en/basic/cashtrade-spottrading/usdt/xdai"
                        >
                            Ascendex
                        </a>
                        , or a fiat on-ramp such as{" "}
                        <a
                            target="_blank"
                            rel="noreferrer noopener"
                            href="https://ramp.network/"
                        >
                            Ramp
                        </a>
                        , to purchase their xDAI. Click{" "}
                        <a
                            target="_blank"
                            rel="noreferrer noopener"
                            href="https://developers.gnosischain.com/for-users/get-xdai-tokens#how-to-get-xdai-stable-tokens"
                        >
                            here
                        </a>{" "}
                        for more information on how to perform any of the above
                        listed activities.
                    </Typography>
                </AccordionDetails>
            </Accordion>
        </Container>
    );
};

export default FAQ;
