import NewsletterModel from "../models/newsletter.model.js";
import nodemailer from 'nodemailer';

const submitNewsletterForm = async (req, res) => {
    const { email } = req.body;

    const existingSubscriber = await NewsletterModel.findOne({ email });
    if (existingSubscriber) {
        res.status(400).json({ message: 'El correo ya está registrado en nuestra newsletter' });
    } else {
        const newSuscriptor = new NewsletterModel({
            email
        });
        newSuscriptor.save();
    }
    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'codescapehotel@gmail.com',
            pass: 'yuocvgmxujkcqock',
        },
    });



    const emailTemplate = `
        <html>
        <head>
            <style>
                section {
                    background-color: #faf8f4;
                    color: #6e5137;
                    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                    width: 100%;
                }
            </style>
        </head>
        <body>
        <div style="display: flex; flex-direction: column; align-items: center; justify-content: center;">

        <span class="m_4878789960067980205mcnPreviewText"
            style="display:none;font-size:0px;line-height:0px;max-height:0px;max-width:0px;opacity:0;overflow:hidden">Gracias
            por suscribirte en nuestra newsletter! Preparate para recibir ofertas increíbles y enterarte de nuestras
            últimas novedades.</span>

        <div>
            <table  cellpadding="0" cellspacing="0" height="100%" width="100%"
                id="m_4878789960067980205bodyTable" style="background-color:rgb(234,236,226)">
                <tbody>
                    <tr>
                        <td class="m_4878789960067980205bodyCell"  valign="top">
                            <table id="m_4878789960067980205root"  cellpadding="0" cellspacing="0"
                                width="100%">
                                <tbody>
                                    <tr>
                                        <td  valign="top">
                                            <table  cellpadding="0" cellspacing="0" width="100%"
                                                style="max-width:660px" role="presentation">
                                                <tbody>
                                                    <tr>
                                                        <td style="background-color:#faf8f4;background-position:center;background-repeat:no-repeat;background-size:cover"
                                                            valign="top">
                                                            <table   cellpadding="0"
                                                                cellspacing="0" width="100%" role="presentation">
                                                                <tbody>
                                                                    <tr>
                                                                        <td style="background-position:center;background-repeat:no-repeat;background-size:cover"
                                                                            valign="top">
                                                                            <table  cellpadding="0"
                                                                                cellspacing="0" width="100%"
                                                                                role="presentation">
                                                                                <tbody>
                                                                                    <tr>
                                                                                        <td style="padding-top:0;padding-bottom:0"
                                                                                            class="m_4878789960067980205mceColumn"
                                                                                            valign="top" colspan="12"
                                                                                            width="100%">
                                                                                            <table 
                                                                                                cellpadding="0"
                                                                                                cellspacing="0"
                                                                                                width="100%"
                                                                                                role="presentation">
                                                                                                <tbody>
                                                                                                    <tr>
                                                                                                        <td style="padding-top:48px;padding-bottom:12px;padding-right:24px;padding-left:24px"
                                                                                                            class="m_4878789960067980205mceBlockContainer"
                                                                                                            valign="top">
                                                                                                            <div class="m_4878789960067980205mceText"
                                                                                                                id="m_4878789960067980205dataBlockId-1"
                                                                                                                style="width:100%">
                                                                                                                <p style="text-align: center;"><strong>Gracias por suscribirte a nuestra
                                                                                                                        Newletter</strong>
                                                                                                                </p>
                                                                                                            </div>
                                                                                                        </td>
                                                                                                    </tr>
                                                                                                    <tr>
                                                                                                        <td style="background-color:transparent;padding-top:20px;padding-bottom:20px;padding-right:24px;padding-left:24px"
                                                                                                            class="m_4878789960067980205mceBlockContainer"
                                                                                                            valign="top">
                                                                                                            <table
                                                                                                                
                                                                                                                cellpadding="0"
                                                                                                                cellspacing="0"
                                                                                                                width="100%"
                                                                                                                style="background-color:transparent"
                                                                                                                role="presentation">
                                                                                                                <tbody>
                                                                                                                    <tr>
                                                                                                                        <td style="min-width:100%;border-top:2px solid #1d130c"
                                                                                                                            valign="top">
                                                                                                                        </td>
                                                                                                                    </tr>
                                                                                                                </tbody>
                                                                                                            </table>
                                                                                                        </td>
                                                                                                    </tr>
                                                                                                    <tr>
                                                                                                        <td style="background-color:transparent;padding-top:0;padding-bottom:0;padding-right:0;padding-left:0"
                                                                                                            class="m_4878789960067980205mceBlockContainer"
                                                                                                            valign="top">
                                                                                                            <table
                                                                                                                
                                                                                                                cellpadding="0"
                                                                                                                cellspacing="0"
                                                                                                                width="100%"
                                                                                                                style="background-color:transparent"
                                                                                                                role="presentation">
                                                                                                                <tbody>
                                                                                                                    <tr>
                                                                                                                        <td style="min-width:100%;border-top:20px solid transparent"
                                                                                                                            valign="top">
                                                                                                                        </td>
                                                                                                                    </tr>
                                                                                                                </tbody>
                                                                                                            </table>
                                                                                                        </td>
                                                                                                    </tr>
                                                                                                    <tr>
                                                                                                        <td style="padding-top:12px;padding-bottom:12px;padding-right:48px;padding-left:48px; display:flex; justify-content:center; align-content:center;"
                                                                                                            class="m_4878789960067980205mceBlockContainer"
                                                                                                            
                                                                                                            valign="top">
                                                                                                            <a href="https://us21.mailchimp.com/mctx/clicks?url=https%3A%2F%2Fapp.hotelcodescape.tech&amp;xid=c069423e0b&amp;uid=196449706&amp;iid=901afd61e0&amp;pool=cts&amp;v=2&amp;c=1693343464&amp;h=fcde24d3775ba498b37817e88a8cebec20629fb807b107fa565060aae86dfc8c"
                                                                                                                style="display:block"
                                                                                                                target="_blank"
                                                                                                                data-saferedirecturl="https://www.google.com/url?q=https://us21.mailchimp.com/mctx/clicks?url%3Dhttps%253A%252F%252Fapp.hotelcodescape.tech%26xid%3Dc069423e0b%26uid%3D196449706%26iid%3D901afd61e0%26pool%3Dcts%26v%3D2%26c%3D1693343464%26h%3Dfcde24d3775ba498b37817e88a8cebec20629fb807b107fa565060aae86dfc8c&amp;source=gmail&amp;ust=1693496574998000&amp;usg=AOvVaw0pkKEVd_sUqpYiFodVI20l"><img
                                                                                                                    width="373.99999999999994"
                                                                                                                    height="auto"
                                                                                                                    style="border:0;width:373.99999999999994px;height:auto;max-width:100%;display:block"
                                                                                                                    alt=""
                                                                                                                    src="https://ci5.googleusercontent.com/proxy/Bv7SA__fxggCAo9x1JivFwAFaO_RbW3NvCX8vVLw0j2DrJYXvNy1SFE9KFK98E5dToeYHNz0ai2mPog2BA-JPeffT74DMPvINvcEcKGa_e5nN_ToAb4U_NU0PPwxi2Ww_WG1jQRBuUuGWdi-EZrfhfWRGnuGwA=s0-d-e1-ft#https://mcusercontent.com/fdf160c783eea8735edc6cbc2/images/b202128d-74cc-494a-7ce7-94e4013dabb4.jpg"
                                                                                                                    role="presentation"
                                                                                                                    class="CToWUd"
                                                                                                                    data-bit="iit"></a>
                                                                                                        </td>
                                                                                                    </tr>
                                                                                                    <tr>
                                                                                                        <td style="padding-top:12px;padding-bottom:12px;padding-right:0;padding-left:0; display:flex; justify-content:center; align-content:center;"
                                                                                                            class="m_4878789960067980205mceBlockContainer"
                                                                                                            
                                                                                                            valign="top">
                                                                                                            <img width="564"
                                                                                                                height="auto"
                                                                                                                style="width:564px;height:auto;max-width:100%;"
                                                                                                                alt=""
                                                                                                                src="https://ci3.googleusercontent.com/proxy/55DseNFT7qG5MqLFY8VRJ7XKk3pEdKpLRqFaUN-5BGNLh1t42atFCz3MDFrsIRRiClBurB2A7WRWaUDCLbhKZz3fnuehDDhjwqBPEn-_qGLmTxbjdCe1RwpfhYZPxCZAEHEFKGUz5Qev4fMhyx7OCHVnEny9yw=s0-d-e1-ft#https://mcusercontent.com/fdf160c783eea8735edc6cbc2/images/083832a2-01d8-2f39-4f6d-7fa49f4178a9.jpg"
                                                                                                                role="presentation"
                                                                                                                class="CToWUd a6T"
                                                                                                                data-bit="iit"
                                                                                                                tabindex="0">
                                                                                                            <div class="a6S"
                                                                                                                dir="ltr"
                                                                                                                style="opacity: 0.01; left: 757.2px; top: 427.275px;">
                                                                                                                <div id=":pk"
                                                                                                                    class="T-I J-J5-Ji aQv T-I-ax7 L3 a5q"
                                                                                                                    role="button"
                                                                                                                    tabindex="0"
                                                                                                                    aria-label="Descargar el archivo adjunto "
                                                                                                                    jslog="91252; u014N:cOuCgd,Kr2w4b,xr6bB; 4:WyIjbXNnLWY6MTc3NTU5OTMyMTI0Mzk5Nzg4MCIsbnVsbCxbXSxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxbXSxbXSxbXV0."
                                                                                                                    data-tooltip-class="a1V"
                                                                                                                    jsaction="JIbuQc:.CLIENT"
                                                                                                                    data-tooltip="Descargar">
                                                                                                                    <div
                                                                                                                        class="akn">
                                                                                                                        <div
                                                                                                                            class="aSK J-J5-Ji aYr">
                                                                                                                        </div>
                                                                                                                    </div>
                                                                                                                </div>
                                                                                                            </div>
                                                                                                        </td>
                                                                                                    </tr>
                                                                                                    <tr>
                                                                                                        <td style="padding-top:12px;padding-bottom:12px;padding-right:24px;padding-left:24px"
                                                                                                            class="m_4878789960067980205mceBlockContainer"
                                                                                                            valign="top">
                                                                                                            <div class="m_4878789960067980205mceText"
                                                                                                                id="m_4878789960067980205dataBlockId-5"
                                                                                                                style="width:100%">
                                                                                                                <h1 style="text-align: center;">¡Bienvenido
                                                                                                                    a
                                                                                                                    CodeScape!
                                                                                                                </h1>
                                                                                                                <p><br>
                                                                                                                </p>
                                                                                                                <p><br>
                                                                                                                </p>
                                                                                                                
                                                                                                                <p style="text-align: center;">En
                                                                                                                    CodeScape,
                                                                                                                    nuestra
                                                                                                                    misión
                                                                                                                    es
                                                                                                                    hacer
                                                                                                                    que
                                                                                                                    cada
                                                                                                                    uno
                                                                                                                    de
                                                                                                                    tus
                                                                                                                    momentos
                                                                                                                    con
                                                                                                                    nosotros
                                                                                                                    sea
                                                                                                                    inolvidable.
                                                                                                                    Desde
                                                                                                                    vistas
                                                                                                                    impresionantes
                                                                                                                    hasta
                                                                                                                    comodidades
                                                                                                                    de
                                                                                                                    lujo,
                                                                                                                    nos
                                                                                                                    esforzamos
                                                                                                                    por
                                                                                                                    brindarte
                                                                                                                    una
                                                                                                                    estancia
                                                                                                                    excepcional
                                                                                                                    que
                                                                                                                    refleje
                                                                                                                    nuestra
                                                                                                                    dedicación
                                                                                                                    a la
                                                                                                                    hospitalidad
                                                                                                                    de
                                                                                                                    primera
                                                                                                                    clase.
                                                                                                                </p>
                                                                                                                <p>Como
                                                                                                                    suscriptor
                                                                                                                    de
                                                                                                                    nuestra
                                                                                                                    newsletter,
                                                                                                                    puedes
                                                                                                                    esperar:
                                                                                                                </p>
                                                                                                                <ol>
                                                                                                                    <li>
                                                                                                                        <p> <b>Ofertas
                                                                                                                            Exclusivas:</b>
                                                                                                                            Te
                                                                                                                            mantendremos
                                                                                                                            informado
                                                                                                                            sobre
                                                                                                                            nuestras
                                                                                                                            ofertas
                                                                                                                            especiales
                                                                                                                            y
                                                                                                                            descuentos
                                                                                                                            exclusivos
                                                                                                                            antes
                                                                                                                            que
                                                                                                                            nadie.
                                                                                                                        </p>
                                                                                                                    </li>
                                                                                                                    <li>
                                                                                                                        <p><b>Eventos
                                                                                                                            y
                                                                                                                            Actividades:</b>
                                                                                                                            Te
                                                                                                                            invitaremos
                                                                                                                            a
                                                                                                                            participar
                                                                                                                            en
                                                                                                                            eventos
                                                                                                                            únicos
                                                                                                                            y
                                                                                                                            actividades
                                                                                                                            emocionantes
                                                                                                                            que
                                                                                                                            mejorarán
                                                                                                                            tu
                                                                                                                            experiencia
                                                                                                                            en
                                                                                                                            CodeScape
                                                                                                                            y
                                                                                                                            en
                                                                                                                            el
                                                                                                                            área
                                                                                                                            circundante.
                                                                                                                        </p>
                                                                                                                    </li>
                                                                                                                    <li>
                                                                                                                        <p><b>Consejos
                                                                                                                            de
                                                                                                                            Viaje:</b>
                                                                                                                            Compartiremos
                                                                                                                            consejos
                                                                                                                            útiles
                                                                                                                            para
                                                                                                                            sacar
                                                                                                                            el
                                                                                                                            máximo
                                                                                                                            provecho
                                                                                                                            de
                                                                                                                            tu
                                                                                                                            estancia
                                                                                                                            y
                                                                                                                            explorar
                                                                                                                            los
                                                                                                                            destinos
                                                                                                                            locales.
                                                                                                                        </p>
                                                                                                                    </li>
                                                                                                                    <li>
                                                                                                                        <p><b>Actualizaciones
                                                                                                                            del
                                                                                                                            Hotel:</b>
                                                                                                                            Te
                                                                                                                            informaremos
                                                                                                                            sobre
                                                                                                                            las
                                                                                                                            renovaciones,
                                                                                                                            mejoras
                                                                                                                            y
                                                                                                                            otras
                                                                                                                            noticias
                                                                                                                            relacionadas
                                                                                                                            con
                                                                                                                            CodeScape.
                                                                                                                        </p>
                                                                                                                    </li>
                                                                                                                </ol>
                                                                                                                <p style="text-align: justify;">No
                                                                                                                    dudes
                                                                                                                    en
                                                                                                                    ponerte
                                                                                                                    en
                                                                                                                    contacto
                                                                                                                    con
                                                                                                                    nuestro
                                                                                                                    equipo
                                                                                                                    si
                                                                                                                    tienes
                                                                                                                    alguna
                                                                                                                    pregunta,
                                                                                                                    solicitud
                                                                                                                    especial
                                                                                                                    o
                                                                                                                    simplemente
                                                                                                                    deseas
                                                                                                                    obtener
                                                                                                                    más
                                                                                                                    información
                                                                                                                    sobre
                                                                                                                    nuestros
                                                                                                                    servicios.
                                                                                                                    Estamos
                                                                                                                    aquí
                                                                                                                    para
                                                                                                                    hacer
                                                                                                                    que
                                                                                                                    tu
                                                                                                                    estadía
                                                                                                                    sea
                                                                                                                    excepcional
                                                                                                                    en
                                                                                                                    todos
                                                                                                                    los
                                                                                                                    sentidos.
                                                                                                                </p>
                                                                                                                <p><br>
                                                                                                                </p>
                                                                                                            </div>
                                                                                                        </td>
                                                                                                    </tr>
                                                                                                    <tr>
                                                                                                        <td style="padding-top:12px;padding-bottom:12px;padding-right:48px;padding-left:48px; display:flex; justify-content:center; align-items:center;"
                                                                                                            class="m_4878789960067980205mceBlockContainer"
                                                                                                            
                                                                                                            valign="top">
                                                                                                            <table
                                                                                                                cellpadding="0"
                                                                                                                cellspacing="0"
                                                                                                                role="presentation">
                                                                                                                <tbody>
                                                                                                                    <tr
                                                                                                                        class="m_4878789960067980205mceStandardButton">
                                                                                                                        <td style="background-color:#1d130c;border-radius:8px;text-align:center; display:flex; justify-content:center; align-content:center"
                                                                                                                            valign="top">
                                                                                                                            <a href="https://app.hotelcodescape.tech/"
                                                                                                                                style="background-color:#1d130c;border-radius:8px;border:2px solid #6e5137;color:#ffffff;display:block;font-family:Arial,'Helvetica Neue',Helvetica,sans-serif;font-size:16px;font-weight:normal;font-style:normal;padding:16px 28px;text-decoration:none;min-width:30px;text-align:center;direction:ltr;letter-spacing:0px"
                                                                                                                                target="_blank"
                                                                                                                                data-saferedirecturl="https://app.hotelcodescape.tech/">Visitar
                                                                                                                                página
                                                                                                                                web</a>
                                                                                                                        </td>
                                                                                                                    </tr>
                                                                                                                    <tr>

                                                                                                                    </tr>
                                                                                                                </tbody>
                                                                                                            </table>
                                                                                                        </td>
                                                                                                    </tr>
                                                                                                    <tr>
                                                                                                        <td style="background-color:transparent;padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;"
                                                                                                            class="m_4878789960067980205mceBlockContainer"
                                                                                                            valign="top">
                                                                                                            <table
                                                                                                                
                                                                                                                cellpadding="0"
                                                                                                                cellspacing="0"
                                                                                                                width="100%"
                                                                                                                style="background-color:transparent "
                                                                                                                role="presentation">
                                                                                                                <tbody>
                                                                                                                    <tr>
                                                                                                                        <td style="min-width:100%;border-top:20px solid transparent"
                                                                                                                            valign="top">
                                                                                                                        </td>
                                                                                                                    </tr>
                                                                                                                </tbody>
                                                                                                            </table>
                                                                                                        </td>
                                                                                                    </tr>
                                                                                                    
                                                                                                    <tr>
                                                                                                        <td style="background-color:#1d130c;padding-top:8px;padding-bottom:8px;padding-right:8px;padding-left:8px"
                                                                                                            valign="top">
                                                                                                            <table
                                                                                                                
                                                                                                                
                                                                                                                cellpadding="0"
                                                                                                                cellspacing="0"
                                                                                                                width="100%"
                                                                                                                role="presentation"
                                                                                                                id="m_4878789960067980205section_65fb4ab88d42bd0261eb8dac603d9ccd"
                                                                                                                class="m_4878789960067980205mceFooterSection">
                                                                                                                <tbody>
                                                                                                                    <tr>
                                                                                                                        <td style="background-color:#1d130c;background-position:center;background-repeat:no-repeat;background-size:cover;padding-top:0px;padding-bottom:0px;"
                                                                                                                            valign="top">
                                                                                                                            <table
                                                                                                                                
                                                                                                                                cellpadding="0"
                                                                                                                                cellspacing="12"
                                                                                                                                width="100%"
                                                                                                                                role="presentation">
                                                                                                                                <tbody>
                                                                                                                                    <tr>
                                                                                                                                        <td style="padding-top:0;padding-bottom:0;margin-bottom:12px"
                                                                                                                                            class="m_4878789960067980205mceColumn"
                                                                                                                                            valign="top"
                                                                                                                                            colspan="12"
                                                                                                                                            width="100%">
                                                                                                                                            <table
                                                                                                                                                
                                                                                                                                                cellpadding="0"
                                                                                                                                                cellspacing="0"
                                                                                                                                                width="100%"
                                                                                                                                                role="presentation" style="display:flex; flex-direction:column; justify-content:center; align-content:center">
                                                                                                                                                <tbody>
                                                                                                                                                    <tr style="display:flex; justify-content:center; align-content: center;">
                                                                                                                                                        <td style="background-color:#1d130c;padding-top:12px;padding-bottom:12px;padding-right:0;padding-left:0; display:flex; justify-content:center; align-items:center;"
                                                                                                                                                            class="m_4878789960067980205mceBlockContainer"
                                                                                                                                                            
                                                                                                                                                            valign="top">
                                                                                                                                                            <img width="250.4098360655738"
                                                                                                                                                                height="auto"
                                                                                                                                                                style="width:250.4098360655738px;height:auto;max-width:100%;display:flex; text-align: center;"
                                                                                                                                                                alt="Logo CodeScape"
                                                                                                                                                                src="https://ci6.googleusercontent.com/proxy/KBqAn1dedH7zyvBDk695wa6ySCaZm1UvFI4fNAOB6kBhMuT7Ddz4I5YWwyNSUYE2A5Yc-mxrXKvNMAflKdJ7fIFp-AmBA_NnizqyAj8SQwXvySDoIKWWv3Kegupcc4lxsa1ET1B1HjHhF25LFldlFV3TUx24pA=s0-d-e1-ft#https://mcusercontent.com/fdf160c783eea8735edc6cbc2/images/4620765f-6fc3-a932-48cd-f78a24a2968e.png"
                                                                                                                                                                class="CToWUd"
                                                                                                                                                                data-bit="iit">
                                                                                                                                                        </td>
                                                                                                                                                    </tr>
                                                                                                                                                    <tr >
                                                                                                                                                        <td style="padding-top:12px;padding-bottom:12px;padding-right:16px;padding-left:16px; display:flex;"
                                                                                                                                                            class="m_4878789960067980205mceBlockContainer"
                                                                                                                                                            
                                                                                                                                                            valign="top">
                                                                                                                                                            <div class="m_4878789960067980205mceText"
                                                                                                                                                                id="m_4878789960067980205dataBlockId-10"
                                                                                                                                                                style="width:100%;">
                                                                                                                                                                <p style="display:flex; justify-content:center; align-items:center; flex-direction: column;"><em><span
                                                                                                                                                                            style="color:#d2c3b1"><span
                                                                                                                                                                                style="font-size:12px; text-align: center;">Copyright
                                                                                                                                                                                2023
                                                                                                                                                                                CODESCAPE
                                                                                                                                                                                |
                                                                                                                                                                                Todos
                                                                                                                                                                                los
                                                                                                                                                                                derechos
                                                                                                                                                                                reservados.</span></span></em><span
                                                                                                                                                                        style="color:#d2c3b1; text-align:center"><br><br><br><span
                                                                                                                                                                            style="font-size:12px">Nuestro
                                                                                                                                                                            correo
                                                                                                                                                                            electrónico
                                                                                                                                                                            es:<br><a
                                                                                                                                                                                href="mailto:codescapehotel@gmail.com"
                                                                                                                                                                                target="_blank">codescapehotel@gmail.com</a></span><br></span>
                                                                                                                                                                </p>
                                                                                                                                                            </div>
                                                                                                                                                        </td>
                                                                                                                                                    </tr>

                                                                                                                                                </tbody>
                                                                                                                                            </table>
                                                                                                                                        </td>
                                                                                                                                    </tr>
                                                                                                                                </tbody>
                                                                                                                            </table>
                                                                                                                        </td>
                                                                                                                    </tr>
                                                                                                                </tbody>
                                                                                                            </table>
                                                                                                        </td>
                                                                                                    </tr>
                                                                                                </tbody>
                                                                                            </table>
                                                                                        </td>
                                                                                    </tr>
                                                                                </tbody>
                                                                            </table>
                                                                        </td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
        </body>
        </html>
        `;
    const mailOptions = {
        from: 'codescapehotel@gmail.com',
        to: email,
        subject: '¡Bienvenido a nuestro newsletter!',
        html: emailTemplate,
    };
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            res.status(500).send('Error en mandar mail de bienvenida');
        } else {
            res.status(200).send('Mail mandado correctamente');
        }
    });
};

const getEmails = async (req, res) => {
    try {
        const suscriptors = await NewsletterModel.find();
        res.status(200).json(suscriptors);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener la lista de correos" });
    }
};
export { submitNewsletterForm, getEmails };
