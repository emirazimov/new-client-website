import React from "react"
import styles from "./TermsOfUse.module.scss"
import { Modal } from "./Modal"

export default function TermsOfUse() {
  const [open, setOpen] = React.useState(false)
  const [term, setTerm] = React.useState("")

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }
  const [show, setShow] = React.useState(false)

  return (
    <>
      <span
        onClick={() => setShow(true)}
        className={styles.termOfUseOpenButton}
        // style={{ color: fontColor }}
      >
        Terms&nbsp;
      </span>
      <Modal
        onClose={() => setShow(false)}
        show={show}
        // aria-labelledby='scroll-dialog-title'
        // aria-describedby='scroll-dialog-description'
      >
        {/* <DialogTitle
          id='scroll-dialog-title'
          style={{ height: '55px', backgroundColor: 'black' }}
        > */}
        <div
          // style={{ width: "600px", height: "100%" }}
          className={styles.termOfUseContainer}
        >
          <p>Terms Of Use</p>
          {/* </DialogTitle> */}
          {/* <DialogContent style={{ backgroundColor: 'black' }}>
          <DialogContentText
            id='scroll-dialog-description'
            ref={descriptionElementRef}
            tabIndex={-1}
            style={{ overflowX: 'hidden', backgroundColor: 'black' }}
          > */}
          <>
            <p>Terms and Conditions of Bookinglane Manager</p>
            <p>
              These Terms governa the use of Bookinglane Manager, and, any other
              related Agreement or legal relationship with the Owner in a
              legally binding way. Capitalized words are defined in the relevant
              dedicated section of this document. The User must read this
              document carefully. Any other contract or agreement entered into
              between the Owner and the Sellers shall always prevail over the
              provisions of these Terms. Therefore, in such cases, these Terms
              shall apply only residually and in accordance with applicable
              provisions in such agreements or contracts. Although the entire
              contractual relationship relating to these Products is entered
              into solely by the Owner and Users, Users acknowledge and agree
              that, where Bookinglane Manager has been provided to them via the
              Apple App Store, Apple may enforce these Terms as a third-party
              beneficiary. Nothing in these Terms creates any relationship of
              employment, agency, or partnership between the involved parties.
              Bookinglane Manager is provided by: Bookinglane LLC 1905 Concord
              Blvd, Concord, CA, 94520, USA Owner contact email:
              info@bookinglane.com
            </p>

            <p>What the User should know at a glance</p>
            <p>
              Bookinglane Manager uses automatic renewal for Product
              subscriptions. Information about the a) renewal period, b)
              termination details and c) termination notice can be found in the
              relevant section of these Terms. Please note that some provisions
              in these Terms may only apply to certain categories of Users. In
              particular, certain provisions may only apply to Consumers or to
              those Users that do not qualify as Consumers. Such limitations are
              always explicitly mentioned within each affected clause. In the
              absence of any such mention, clauses apply to all Users. How
              Bookinglane Manager works By accepting the Terms, Users fully and
              unconditionally release and forever discharge the Owner, its
              officers, directors, employees and agents from any and all claims,
              demands and damages (actual or consequential, direct or indirect),
              whether now known or unknown, of every kind and nature relating
              to, arising out of or in any way connected with: disputes between
              Users, or any other person or entity, the Products’ use,
              including, without limitation, any and all claims that such use
              violates any of Seller’s intellectual property rights, copyrights,
              rights of publicity or privacy, “moral rights,” or rights of
              attribution and integrity, or Users’ activity on Bookinglane
              Manager, including, but not limited to, Users’ legal capacity,
              ability to complete a transaction, or pay the associated costs.
              User acknowledges and agrees that the Owner has no control over,
              and shall have no liability for any damages resulting from, the
              use or misuse by any other person or entity of any Products. If
              the Owner becomes aware of any Products that allegedly may not
              conform to the Terms, the Owner may investigate the allegation and
              determine in its sole discretion whether to take action in
              accordance with the Terms. The Owner has no liability or
              responsibility to Users for performance or nonperformance of such
              activities. The Owner has the absolute right to remove and/or
              delete without notice any Products within its control that it
              deems objectionable. Users consent to such removal and/or deletion
              and waive any claim against the Owner for such removal and/or
              deletion. The Owner is not responsible or liable for failure to
              store posted content or other materials Users may transmit through
              Bookinglane Manager. Users shall take measures to preserve copies
              of any data, material, content or information such User posts on
              Bookinglane Manager. Any identity verification methods the Owner
              employs is strictly on a best efforts basis and shall not be
              relied upon by Users. Without prejudice to its role as a mere
              technical intermediary as described above, the Owner may provide
              additional services to either party of such interaction, such as
              providing packaging, shipping or facilitating dispute resolution.
              Bookinglane Manager merely serves as a technical infrastructure or
              platform to allow Users to interact with each other. The Owner
              therefore is not directly involved in any such interactions
              between Users. These Terms only apply to the described usage of
              Bookinglane Manager as a platform. Terms, conditions and any other
              provision applying specifically to transactions between Buyers and
              Sellers are specified by each Seller.
            </p>

            <p>TERMS OF USE</p>
            <p>
              Unless otherwise specified, the terms of use detailed in this
              section apply generally when using Bookinglane Manager. Single or
              additional conditions of use or access may apply in specific
              scenarios and in such cases are additionally indicated within this
              document. By using Bookinglane Manager, Users confirm to meet the
              following requirements: There are no restrictions for Users in
              terms of being Consumers or Business Users; Users aren’t located
              in a country that is subject to a U.S. Government embargo, or that
              has been designated by the U.S. Government as a
              “terrorist-supporting” country; Users aren’t listed on any U.S.
              Government list of prohibited or restricted parties;
            </p>

            <p>Account registration</p>

            <p>
              To use the Service Users must register or create a User account,
              providing all required data or information in a complete and
              truthful manner. Failure to do so will cause unavailability of the
              Service. Users are responsible for keeping their login credentials
              confidential and safe. For this reason, Users are also required to
              choose passwords that meet the highest standards of strength
              permitted by Bookinglane Manager. By registering, Users agree to
              be fully responsible for all activities that occur under their
              username and password. Users are required to immediately and
              unambiguously inform the Owner via the contact details indicated
              in this document, if they think their personal information,
              including but not limited to User accounts, access credentials or
              personal data, have been violated, unduly disclosed or stolen.
            </p>

            <p>Conditions for account registration</p>

            <p>
              Registration of User accounts on Bookinglane Manager is subject to
              the conditions outlined below. By registering, Users agree to meet
              such conditions. Accounts registered by bots or any other
              automated methods are not permitted. Unless otherwise specified,
              each User must register only one account. Unless explicitly
              permitted, a User account may not be shared with other persons.
            </p>

            <p>Account termination</p>

            <p>
              Users can terminate their account and stop using the Service at
              any time by doing the following: By directly contacting the Owner
              at the contact details provided in this document. However,
              termination of the account will not be possible until the
              subscription period paid for by the User has expired.
            </p>

            <p>Account suspension and deletion</p>

            <p>
              The Owner reserves the right, at its sole discretion, to suspend
              or delete at any time and without notice, User accounts which it
              deems inappropriate, offensive or in violation of these Terms. The
              suspension or deletion of User accounts shall not entitle Users to
              any claims for compensation, damages or reimbursement. The
              suspension or deletion of accounts due to causes attributable to
              the User does not exempt the User from paying any applicable fees
              or prices.
            </p>

            <p>Content on Bookinglane Manager</p>

            <p>
              Unless where otherwise specified or clearly recognizable, all
              content available on Bookinglane Manager is owned or provided by
              the Owner or its licensors. The Owner undertakes its utmost effort
              to ensure that the content provided on Bookinglane Manager
              infringes no applicable legal provisions or third-party rights.
              However, it may not always be possible to achieve such a result.
              In such cases, without prejudice to any legal prerogatives of
              Users to enforce their rights, Users are kindly asked to
              preferably report related complaints using the contact details
              provided in this document.
            </p>

            <p>
              Rights regarding content on Bookinglane Manager - All rights
              reserved
            </p>

            <p>
              The Owner holds and reserves all intellectual property rights for
              any such content. Users may not therefore use such content in any
              way that is not necessary or implicit in the proper use of the
              Service. In particular, but without limitation, Users may not
              copy, download, share (beyond the limits set forth below), modify,
              translate, transform, publish, transmit, sell, sublicense, edit,
              transfer/assign to third parties or create derivative works from
              the content available on Bookinglane Manager, nor allow any third
              party to do so through the User or their device, even without the
              User&apos;s knowledge. Where explicitly stated on Bookinglane
              Manager, the User may download, copy and/or share some content
              available through Bookinglane Manager for its sole personal and
              non-commercial use and provided that the copyright attributions
              and all the other attributions requested by the Owner are
              correctly implemented. Any applicable statutory limitation or
              exception to copyright shall stay unaffected.
            </p>

            <p>Content provided by Users</p>

            <p>
              The Owner allows Users to upload, share or provide their own
              content to Bookinglane Manager. By providing content to
              Bookinglane Manager, Users confirm that they are legally allowed
              to do so and that they are not infringing any statutory provisions
              and/or third-party rights. Further insights regarding acceptable
              content can be found inside the respective section on Bookinglane
              Manager which details the acceptable uses.
            </p>

            <p>Rights regarding content provided by Users</p>

            <p>
              Users acknowledge and accept that by providing their own content
              on Bookinglane Manager they grant the Owner a non-exclusive, fully
              paid-up and royalty-free license to process such content solely
              for the operation and maintenance of Bookinglane Manager as
              contractually required. To the extent permitted by applicable law,
              Users waive any moral rights in connection with content they
              provide to Bookinglane Manager. Users acknowledge, accept and
              confirm that all content they provide through Bookinglane Manager
              is provided subject to the same general conditions set forth for
              content on Bookinglane Manager.
            </p>

            <p>Liability for provided content</p>
            <p>
              Users are solely liable for any content they upload, post, share,
              or provide through Bookinglane Manager. Users acknowledge and
              accept that the Owner does not filter or moderate such content.
              However, the Owner reserves the right to remove, delete, block or
              rectify such content at its own discretion and to, without prior
              notice, deny the uploading User access to Bookinglane Manager: if
              any complaint based on such content is received; if a notice of
              infringement of intellectual property rights is received; upon
              order of a public authority; or where the Owner is made aware that
              the content, while being accessible via Bookinglane Manager, may
              represent a risk for Users, third parties and/or the availability
              of the Service. The removal, deletion, blocking or rectification
              of content shall not entitle Users that have provided such content
              or that are liable for it, to any claims for compensation, damages
              or reimbursement. Users agree to hold the Owner harmless from and
              against any claim asserted and/or damage suffered due to content
              they provided to or provided through Bookinglane Manager.
            </p>

            <p>Access to external resources</p>
            <p>
              Through Bookinglane Manager Users may have access to external
              resources provided by third parties. Users acknowledge and accept
              that the Owner has no control over such resources and is therefore
              not responsible for their content and availability. Conditions
              applicable to any resources provided by third parties, including
              those applicable to any possible grant of rights in content,
              result from each such third parties’ terms and conditions or, in
              the absence of those, applicable statutory law.
            </p>

            <p>Acceptable use</p>
            <p>
              Bookinglane Manager and the Service may only be used within the
              scope of what they are provided for, under these Terms and
              applicable law. Users are solely responsible for making sure that
              their use of Bookinglane Manager and/or the Service violates no
              applicable law, regulations or third-party rights. Therefore, the
              Owner reserves the right to take any appropriate measure to
              protect its legitimate interests including by denying Users access
              to Bookinglane Manager or the Service, terminating contracts,
              reporting any misconduct performed through Bookinglane Manager or
              the Service to the competent authorities – such as judicial or
              administrative authorities - whenever Users engage or are
              suspected to engage in any of the following activities: violate
              laws, regulations and/or these Terms; infringe any third-party
              rights; considerably impair the Owner’s legitimate interests;
              offend the Owner or any third party.
            </p>

            <p>Software license</p>
            <p>
              The software embedded in or related to Bookinglane Manager is
              provided under a some-rights-reserved license. This means that
              Users are granted broad rights, including but not limited to the
              rights to use, execute, copy or distribute the software, to the
              extent determined by such license. The terms of such license shall
              always prevail upon conflicting, divergent or inconsistent
              provisions of these Terms. Users may find further information
              regarding the license terms in the relevant section of Bookinglane
              Manager.
            </p>

            <p variant="h5" color="textPrimary" paragraph={true}>
              TERMS AND CONDITIONS OF SALE
            </p>

            <p>Paid Products</p>
            <p>
              Some of the Products provided on Bookinglane Manager, as part of
              the Service, are provided on the basis of payment. The fees,
              duration and conditions applicable to the purchase of such
              Products are described below and in the dedicated sections of
              Bookinglane Manager.
            </p>
            <p>Product description</p>
            <p>
              Prices, descriptions or availability of Products are outlined in
              the respective sections of Bookinglane Manager and are subject to
              change without notice. While Products on Bookinglane Manager are
              presented with the greatest accuracy technically possible,
              representation on Bookinglane Manager through any means
              (including, as the case may be, graphic material, images, colors,
              sounds) is for reference only and implies no warranty as to the
              characteristics of the purchased Product. The characteristics of
              the chosen Product will be outlined during the purchasing process.
            </p>
            <p>Purchasing process</p>
            <p>
              Any steps taken from choosing a Product to order submission form
              part of the purchasing process. The purchasing process includes
              these steps: By clicking on the checkout button, Users open the
              Stripe checkout section, wherein they will have to specify their
              contact details and a payment method of their choice. After
              providing all the required information, Users must carefully
              review the order and, subsequently, confirm and submit it by using
              the relevant button or mechanism on Bookinglane Manager, hereby
              accepting these Terms and committing to pay the agreed-upon price.
            </p>
            <p>Order submission</p>
            <p>
              When the User submits an order, the following applies: The
              submission of an order determines contract conclusion and
              therefore creates for the User the obligation to pay the price,
              taxes and possible further fees and expenses, as specified on the
              order page. In case the purchased Product requires active input
              from the User, such as the provision of personal information or
              data, specifications or special wishes, the order submission
              creates an obligation for the User to cooperate accordingly. Upon
              submission of the order, Users will receive a receipt confirming
              that the order has been received. All notifications related to the
              described purchasing process shall be sent to the email address
              provided by the User for such purposes.
            </p>

            <p>Prices</p>
            <p>
              Users are informed during the purchasing process and before order
              submission, about any fees, taxes and costs (including, if any,
              delivery costs) that they will be charged. Prices on Bookinglane
              Manager are displayed: either exclusive or inclusive of any
              applicable fees, taxes and costs, depending on the section the
              User is browsing.
            </p>

            <p>Methods of payment</p>
            <p>
              Information related to accepted payment methods are made available
              during the purchasing process. Some payment methods may only be
              available subject to additional conditions or fees. In such cases
              related information can be found in the dedicated section of
              Bookinglane Manager. All payments are independently processed
              through third-party services. Therefore, Bookinglane Manager does
              not collect any payment information – such as credit card details
              – but only receives a notification once the payment has been
              successfully completed. If payment through the available methods
              fail or is refused by the payment service provider, the Owner
              shall be under no obligation to fulfil the purchase order. Any
              possible costs or fees resulting from the failed or refused
              payment shall be borne by the User.
            </p>
            <p>Purchase via app store</p>
            <p>
              Bookinglane Manager or specific Products available for sale on
              Bookinglane Manager must be purchased via a third-party app store.
              To access such purchases, Users must follow the instructions
              provided on the relevant online store (such as &quot;Apple App
              Store&quot; or &quot;Google Play&quot;), which may vary depending
              on the particular device in use. Unless otherwise specified,
              purchases done via third-party online stores are also subject to
              such third-parties’ terms and conditions, which, in case of any
              inconsistency or conflict, shall always prevail upon these Terms.
              Users purchasing through such third-party online stores must
              therefore read such terms and conditions of sale carefully and
              accept them.
            </p>
            <p>Retention of usage rights</p>
            <p>
              Users do not acquire any rights to use the purchased Product until
              the total purchase price is received by the Owner.
            </p>
            <p>Delivery</p>
            <p>
              Performance of services The purchased service shall be performed
              or made available within the timeframe specified on Bookinglane
              Manager or as communicated before the order submission.
            </p>
            <p>Contract duration</p>
            <p>
              Trial period Users have the option to test Bookinglane Manager or
              selected Products during a limited and non-renewable trial period,
              at no cost. Some features or functions of Bookinglane Manager may
              not be available to Users during the trial period. Further
              conditions applicable to the trial period, including its duration,
              will be specified on Bookinglane Manager. The trial period shall
              automatically convert into the equivalent paid Product, unless the
              User cancels the purchase before the trial period expires.
              Subscriptions Subscriptions allow Users to receive a Product
              continuously or regularly over a determined period of time. Paid
              subscriptions begin on the day the payment is received by the
              Owner. In order to maintain subscriptions, Users must pay the
              required recurring fee in a timely manner. Failure to do so may
              cause service interruptions. Fixed-term subscriptions Paid
              fixed-term subscriptions start on the day the payment is received
              by the Owner and last for the subscription period chosen by the
              User or otherwise specified during the purchasing process. Once
              the subscription period expires, the Product shall no longer be
              accessible, unless the User renews the subscription by paying the
              relevant fee. Fixed-term subscriptions may not be terminated
              prematurely and shall run out upon expiration of the subscription
              term. Subscriptions handled via Apple ID Users may subscribe to a
              Product using the Apple ID associated with their Apple App Store
              account by using the relevant process on Bookinglane Manager. When
              doing so, Users acknowledge and accept that any payment due shall
              be charged to their Apple ID account; subscriptions are
              automatically renewed for the same duration unless the User
              cancels at least 24 hours before the current period expires; any
              and all fees or payments due for renewal will be charged within
              24-hours before the end of the current period; subscriptions can
              be managed or cancelled in the Users’ Apple App Store account
              settings. The above shall prevail upon any conflicting or
              diverging provision of these Terms. Automatic renewal
              Subscriptions are automatically renewed through the payment method
              that the User chose during purchase, unless the User cancels the
              subscription within the deadlines for termination specified in the
              relevant section of these Terms and/or Bookinglane Manager. The
              renewed subscription will last for a period equal to the original
              term. The User shall receive a reminder of the upcoming renewal
              with reasonable advance, outlining the procedure to be followed in
              order to cancel the automatic renewal. Termination Recurring
              subscriptions may be terminated at any time by sending a clear and
              unambiguous termination notice to the Owner using the contact
              details provided in this document, or — if applicable — by using
              the corresponding controls inside Bookinglane Manager. Termination
              notice If the notice of termination is received by the Owner
              before the subscription renews, the termination shall take effect
              as soon as the current period is completed.
            </p>
            <p>User rights</p>
            <p>Right of withdrawal</p>
            <p>
              Unless exceptions apply, the User may be eligible to withdraw from
              the contract within the period specified below (generally 14
              days), for any reason and without justification. Users can learn
              more about the withdrawal conditions within this section. The
              right of withdrawal does not apply on Bookinglane Manager Users
              acknowledge and accept that the right of withdrawal does not apply
              to contracts concluded over Bookinglane Manager due to the nature
              of its offering.
            </p>
            <p>Liability and indemnification</p>
            <p>EU Users</p>
            <p>
              Indemnification The User agrees to indemnify and hold the Owner
              and its subsidiaries, affiliates, officers, directors, agents,
              co-branders, partners and employees harmless from and against any
              claim or demand ⁠— including but not limited to lawyer&apos;s fees
              and costs ⁠— made by any third party due to or in relation with
              any culpable use of or connection to the Service, violation of
              these Terms, infringement of any third-party rights or statutory
              provision by the User or its affiliates, officers, directors,
              agents, co-branders, partners and employees to the extent allowed
              by applicable law. Users acknowledge and accept that the Owner
              merely provides Users with the technical infrastructure and
              features incorporated in Bookinglane Manager. The Owner does not
              intermediate, moderate, promote or intervene in interactions,
              agreements or transactions between Users and therefore bears no
              liability for any such interactions among Users, including the
              performance of any Users&apos; obligations. Users, in particular,
              acknowledge and accept that the Owner is not involved in sales and
              purchases by Users qualifying respectively as Sellers or Buyers
              over Bookinglane Manager. This means that Sellers and Buyers are
              solely liable for respectively offering and purchasing through
              Bookinglane Manager and for the obligations resulting thereof. In
              particular, the Owner shall bear no liability for: any
              pre-contractual statement, claim or description of the Products
              offered through/via Bookinglane Manager; the existence of any
              applicable license, authorization, qualification or other official
              permit allowing Sellers to offer specific goods or services, as
              may be required by applicable law; the Buyers&apos; eligibility
              (e.g. in terms of age, solvency etc.) for purchase according to
              applicable law; any obligation stipulated by Users over
              Bookinglane Manager, including but not limited to product
              guarantees and product safety; any claim based on partial,
              incorrect or failed performance of binding agreements entered into
              on Bookinglane Manager. Limitation of liability Unless otherwise
              explicitly stated and without prejudice to applicable statutory
              product liability provisions, Users shall have no right to claim
              damages against the Owner (or any natural or legal person acting
              on its behalf). This does not apply to damages to life, health or
              physical integrity, damages resulting from the breach of an
              essential contractual obligation such as any obligation strictly
              necessary to achieve the purpose of the contract, and/or damages
              resulting from intent or gross negligence, as long as Bookinglane
              Manager has been appropriately and correctly used by the User.
              Unless damages have been caused by way of intent or gross
              negligence, or they affect life, health or physical integrity, the
              Owner shall only be liable to the extent of typical and
              foreseeable damages at the moment the contract was entered into.
              In particular, within the limits stated above, the Owner shall not
              be liable for: any loss of business opportunities and any other
              loss, even indirect, that may be incurred by the User (such as,
              but not limited to, trading losses, loss of revenue, income,
              profits or anticipated savings, loss of contracts or business
              relationships, loss of reputation or goodwill, etc.); damages or
              losses resulting from interruptions or malfunctions of Bookinglane
              Manager due to acts of force majeure, or unforeseen and
              unforeseeable events and, in any case, independent of the will and
              beyond the control of the Owner, such as, but not limited to,
              failures or disruptions of telephone or electrical lines, the
              Internet and / or other means of transmission, unavailability of
              websites, strikes, natural disasters, viruses and cyber attacks,
              interruptions in the delivery of products, third-party services or
              applications; any losses that are not the direct consequence of a
              breach of the Terms by the Owner; Notwithstanding the above, the
              following limitation applies to all Users not qualifying as
              Consumers: In any event of liability, the compensation may not
              exceed the total payments that have been, will be or would be
              received by the Owner from the User based on the contract over a
              period of 12 months, or the period of the duration of the
              Agreement, if shorter.
            </p>
            <p>Australian Users</p>
            <p>Limitation of liability</p>
            <p>
              Nothing in these Terms excludes, restricts or modifies any
              guarantee, condition, warranty, right or remedy which the User may
              have under the Competition and Consumer Act 2010 (Cth) or any
              similar State and Territory legislation and which cannot be
              excluded, restricted or modified (non-excludable right). To the
              fullest extent permitted by law, our liability to the User,
              including liability for a breach of a non-excludable right and
              liability which is not otherwise excluded under these Terms of
              Use, is limited, at the Owner’s sole discretion, to the
              re-performance of the services or the payment of the cost of
              having the services supplied again.
            </p>

            <p>US Users</p>
            <p>
              Disclaimer of Warranties Bookinglane Manager is provided strictly
              on an “as is” and “as available” basis. Use of the Service is at
              Users’ own risk. To the maximum extent permitted by applicable
              law, the Owner expressly disclaims all conditions,
              representations, and warranties — whether express, implied,
              statutory or otherwise, including, but not limited to, any implied
              warranty of merchantability, fitness for a particular purpose, or
              non-infringement of third-party rights. No advice or information,
              whether oral or written, obtained by user from owner or through
              the Service will create any warranty not expressly stated herein.
              Without limiting the foregoing, the Owner, its subsidiaries,
              affiliates, licensors, officers, directors, agents, co-branders,
              partners, suppliers and employees do not warrant that the content
              is accurate, reliable or correct; that the Service will meet
              Users’ requirements; that the Service will be available at any
              particular time or location, uninterrupted or secure; that any
              defects or errors will be corrected; or that the Service is free
              of viruses or other harmful components. Any content downloaded or
              otherwise obtained through the use of the Service is downloaded at
              users own risk and users shall be solely responsible for any
              damage to Users’ computer system or mobile device or loss of data
              that results from such download or Users’ use of the Service. The
              Owner does not warrant, endorse, guarantee, or assume
              responsibility for any product or service advertised or offered by
              a third party through the Service or any hyperlinked website or
              service, and the Owner shall not be a party to or in any way
              monitor any transaction between Users and third-party providers of
              products or services. The Service may become inaccessible or it
              may not function properly with Users’ web browser, mobile device,
              and/or operating system. The owner cannot be held liable for any
              perceived or actual damages arising from Service content,
              operation, or use of this Service. Federal law, some states, and
              other jurisdictions, do not allow the exclusion and limitations of
              certain implied warranties. The above exclusions may not apply to
              Users. This Agreement gives Users specific legal rights, and Users
              may also have other rights which vary from state to state. The
              disclaimers and exclusions under this agreement shall not apply to
              the extent prohibited by applicable law.
            </p>
            <p>Limitations of liability</p>
            <p>
              To the maximum extent permitted by applicable law, in no event
              shall the Owner, and its subsidiaries, affiliates, officers,
              directors, agents, co-branders, partners, suppliers and employees
              be liable for any indirect, punitive, incidental, special,
              consequential or exemplary damages, including without limitation
              damages for loss of profits, goodwill, use, data or other
              intangible losses, arising out of or relating to the use of, or
              inability to use, the Service; and any damage, loss or injury
              resulting from hacking, tampering or other unauthorized access or
              use of the Service or User account or the information contained
              therein; any errors, mistakes, or inaccuracies of content;
              personal injury or property damage, of any nature whatsoever,
              resulting from User access to or use of the Service; any
              unauthorized access to or use of the Owner’s secure servers and/or
              any and all personal information stored therein; any interruption
              or cessation of transmission to or from the Service; any bugs,
              viruses, trojan horses, or the like that may be transmitted to or
              through the Service; any errors or omissions in any content or for
              any loss or damage incurred as a result of the use of any content
              posted, emailed, transmitted, or otherwise made available through
              the Service; and/or the defamatory, offensive, or illegal conduct
              of any User or third party. In no event shall the Owner, and its
              subsidiaries, affiliates, officers, directors, agents,
              co-branders, partners, suppliers and employees be liable for any
              claims, proceedings, liabilities, obligations, damages, losses or
              costs in an amount exceeding the amount paid by User to the Owner
              hereunder in the preceding 12 months, or the period of duration of
              this agreement between the Owner and User, whichever is shorter.
              This limitation of liability section shall apply to the fullest
              extent permitted by law in the applicable jurisdiction whether the
              alleged liability is based on contract, tort, negligence, strict
              liability, or any other basis, even if company has been advised of
              the possibility of such damage. Some jurisdictions do not allow
              the exclusion or limitation of incidental or consequential
              damages, therefore the above limitations or exclusions may not
              apply to User. The terms give User specific legal rights, and User
              may also have other rights which vary from jurisdiction to
              jurisdiction. The disclaimers, exclusions, and limitations of
              liability under the terms shall not apply to the extent prohibited
              by applicable law.
            </p>
            <p>Indemnification</p>
            <p>
              The User agrees to defend, indemnify and hold the Owner and its
              subsidiaries, affiliates, officers, directors, agents,
              co-branders, partners, suppliers and employees harmless from and
              against any and all claims or demands, damages, obligations,
              losses, liabilities, costs or debt, and expenses, including, but
              not limited to, legal fees and expenses, arising from User’s use
              of and access to the Service, including any data or content
              transmitted or received by User; User’s violation of these terms,
              including, but not limited to, User’s breach of any of the
              representations and warranties set forth in these terms; User’s
              violation of any third-party rights, including, but not limited
              to, any right of privacy or intellectual property rights; User’s
              violation of any statutory law, rule, or regulation; any content
              that is submitted from User’s account, including third party
              access with User’s unique username, password or other security
              measure, if applicable, including, but not limited to, misleading,
              false, or inaccurate information; User’s willful misconduct; or
              statutory provision by User or its affiliates, officers,
              directors, agents, co-branders, partners, suppliers and employees
              to the extent allowed by applicable law.
            </p>
            <p>Common provisions</p>
            <p>No Waiver</p>
            <p>
              The Owner’s failure to assert any right or provision under these
              Terms shall not constitute a waiver of any such right or
              provision. No waiver shall be considered a further or continuing
              waiver of such term or any other term.
            </p>
            <p>Service interruption</p>
            <p>
              To ensure the best possible service level, the Owner reserves the
              right to interrupt the Service for maintenance, system updates or
              any other changes, informing the Users appropriately. Within the
              limits of law, the Owner may also decide to suspend or terminate
              the Service altogether. If the Service is terminated, the Owner
              will cooperate with Users to enable them to withdraw Personal Data
              or information in accordance with applicable law. Additionally,
              the Service might not be available due to reasons outside the
              Owner’s reasonable control, such as “force majeure” (eg. labor
              actions, infrastructural breakdowns or blackouts etc).
            </p>
            <p>Service reselling</p>
            <p>
              Users may not reproduce, duplicate, copy, sell, resell or exploit
              any portion of Bookinglane Manager and of its Service without the
              Owner’s express prior written permission, granted either directly
              or through a legitimate reselling program.
            </p>
            <p>Privacy policy</p>
            <p>
              To learn more about the use of their Personal Data, Users may
              refer to the privacy policy of Bookinglane Manager.
            </p>

            <p>Intellectual property rights</p>
            <p>
              Without prejudice to any more specific provision of these Terms,
              any intellectual property rights, such as copyrights, trademark
              rights, patent rights and design rights related to Bookinglane
              Manager are the exclusive property of the Owner or its licensors
              and are subject to the protection granted by applicable laws or
              international treaties relating to intellectual property. All
              trademarks — nominal or figurative — and all other marks, trade
              names, service marks, word marks, illustrations, images, or logos
              appearing in connection with Bookinglane Manager are, and remain,
              the exclusive property of the Owner or its licensors and are
              subject to the protection granted by applicable laws or
              international treaties related to intellectual property.
            </p>
            <p>Changes to these Terms</p>
            <p>
              The Owner reserves the right to amend or otherwise modify these
              Terms at any time. In such cases, the Owner will appropriately
              inform the User of these changes. Such changes will only affect
              the relationship with the User for the future. The continued use
              of the Service will signify the User’s acceptance of the revised
              Terms. If Users do not wish to be bound by the changes, they must
              stop using the Service. Failure to accept the revised Terms, may
              entitle either party to terminate the Agreement. The applicable
              previous version will govern the relationship prior to the
              User&apos;s acceptance. The User can obtain any previous version
              from the Owner. If required by applicable law, the Owner will
              specify the date by which the modified Terms will enter into
              force.
            </p>
            <p>Assignment of contract</p>
            <p>
              The Owner reserves the right to transfer, assign, dispose of by
              novation, or subcontract any or all rights or obligations under
              these Terms, taking the User’s legitimate interests into account.
              Provisions regarding changes of these Terms will apply
              accordingly. Users may not assign or transfer their rights or
              obligations under these Terms in any way, without the written
              permission of the Owner.
            </p>
            <p>Contacts</p>
            <p>
              All communications relating to the use of Bookinglane Manager must
              be sent using the contact information stated in this document.
            </p>
            <p>Severability</p>
            <p>
              Should any provision of these Terms be deemed or become invalid or
              unenforceable under applicable law, the invalidity or
              unenforceability of such provision shall not affect the validity
              of the remaining provisions, which shall remain in full force and
              effect.
            </p>
            <p>US Users</p>
            <p>
              Any such invalid or unenforceable provision will be interpreted,
              construed and reformed to the extent reasonably required to render
              it valid, enforceable and consistent with its original intent.
              These Terms constitute the entire Agreement between Users and the
              Owner with respect to the subject matter hereof, and supersede all
              other communications, including but not limited to all prior
              agreements, between the parties with respect to such subject
              matter. These Terms will be enforced to the fullest extent
              permitted by law.
            </p>
            <p>EU Users</p>
            <p>
              Should any provision of these Terms be or be deemed void, invalid
              or unenforceable, the parties shall do their best to find, in an
              amicable way, an agreement on valid and enforceable provisions
              thereby substituting the void, invalid or unenforceable parts. In
              case of failure to do so, the void, invalid or unenforceable
              provisions shall be replaced by the applicable statutory
              provisions, if so permitted or stated under the applicable law.
              Without prejudice to the above, the nullity, invalidity or the
              impossibility to enforce a particular provision of these Terms
              shall not nullify the entire Agreement, unless the severed
              provisions are essential to the Agreement, or of such importance
              that the parties would not have entered into the contract if they
              had known that the provision would not be valid, or in cases where
              the remaining provisions would translate into an unacceptable
              hardship on any of the parties.
            </p>
            <p>Governing law</p>
            <p>
              These Terms are governed by the law of the place where the Owner
              is based, as disclosed in the relevant section of this document,
              without regard to conflict of laws principles. Exception for
              European Consumers However, regardless of the above, if the User
              qualifies as a European Consumer and has their habitual residence
              in a country where the law provides for a higher consumer
              protection standard, such higher standards shall prevail.
            </p>
            <p>Venue of jurisdiction</p>
            <p>
              The exclusive competence to decide on any controversy resulting
              from or connected to these Terms lies with the courts of the place
              where the Owner is based, as displayed in the relevant section of
              this document. Exception for European Consumers The above does not
              apply to any Users that qualify as European Consumers, nor to
              Consumers based in Switzerland, Norway or Iceland.
            </p>

            <p>Dispute resolution</p>
            <p>Amicable dispute resolution</p>
            <p>
              Users may bring any disputes to the Owner who will try to resolve
              them amicably. While Users&apos; right to take legal action shall
              always remain unaffected, in the event of any controversy
              regarding the use of Bookinglane Manager or the Service, Users are
              kindly asked to contact the Owner at the contact details provided
              in this document. The User may submit the complaint including a
              brief description and if applicable, the details of the related
              order, purchase, or account, to the Owner’s email address
              specified in this document. The Owner will process the complaint
              without undue delay and within 21 days of receiving it.
            </p>
            <p>Definitions and legal references</p>
            <p>
              Bookinglane Manager (or this Application) The property that
              enables the provision of the Service.
            </p>

            <p>Agreement</p>
            <p>
              Any legally binding or contractual relationship between the Owner
              and the User, governed by these Terms.
            </p>
            <p>Business User</p>
            <p>Any User that does not qualify as a Consumer.</p>
            <p>Buyer</p>
            <p>
              Indicates any User who buys goods or services from Sellers through
              Bookinglane Manager, regardless of whether or not the actual
              transaction takes place through Bookinglane Manager.
            </p>
            <p>European (or Europe)</p>
            <p>
              Applies where a User is physically present or has their registered
              offices within the EU, regardless of nationality.
            </p>
            <p>Example withdrawal form</p>
            <p>
              Addressed to: Bookinglane LLC 1905 Concord Blvd, Concord, CA,
              94520, USA info@bookinglane.com
            </p>
            <p>
              I/We hereby give notice that I/we withdraw from my/our contract of
              sale of the following goods/for the provision of the following
              service: _____________________________________________ (insert a
              description of the goods/services that are subject to the
              respective withdrawal) Ordered on:
              _____________________________________________ (insert the date)
              Received on: _____________________________________________ (insert
              the date) Name of
              consumer(s):_____________________________________________ Address
              of consumer(s):_____________________________________________ Date:
              _____________________________________________ (sign if this form
              is notified on paper)
            </p>
            <p>Owner (or We)</p>
            <p>
              Indicates the natural person(s) or legal entity that provides
              Bookinglane Manager and/or the Service to Users.
            </p>
            <p>Product</p>
            <p>
              A good or service available for purchase through Bookinglane
              Manager, such as e.g. physical goods, digital files, software,
              booking services etc. The sale of Products may be part of the
              Service.
            </p>
            <p>Seller</p>
            <p>
              Indicates any User who sells goods or services to Buyers through
              Bookinglane Manager, regardless of whether or not the actual
              transaction takes place through Bookinglane Manager.
            </p>
            <p>Service</p>
            <p>
              The service provided by Bookinglane Manager as described in these
              Terms and on Bookinglane Manager.
            </p>
            <p>Terms</p>
            <p>
              All provisions applicable to the use of Bookinglane Manager and/or
              the Service as described in this document, including any other
              related documents or agreements, and as updated from time to time.
            </p>
            <p>User (or You)</p>
            <p>
              Indicates any natural person or legal entity using Bookinglane
              Manager.
            </p>
            <p>Consumer</p>
            <p>
              Any User qualifying as a natural person who accesses goods or
              services for personal use, or more generally, acts for purposes
              outside their trade, business, craft or profession. Latest update:
              April 19, 2021 iubenda hosts this content and only collects the
              Personal Data strictly necessary for it to be provided.
            </p>
          </>
        </div>
        {/* </DialogContentText>
        </DialogContent> */}
        {/* <DialogActions>
          <Button onClick={handleClose} color='primary'>
            OK
          </Button>
        </DialogActions> */}
      </Modal>
    </>
  )
}
