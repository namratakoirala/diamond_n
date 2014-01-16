<?php 
/**
 * Magento
 *
 * @author    Meigeeteam http://www.meaigeeteam.com <nick@meaigeeteam.com>
 * @copyright Copyright (C) 2010 - 2012 Meigeeteam
 *
 */
class Meigee_ThemeOptions_Helper_Data extends Mage_Core_Helper_Abstract
{
 public function getThemeOptions ($themeOption) {
 	switch ($themeOption) {
		case 'mediaurl':
		    return Mage::getBaseUrl('media') . 'images/';
		break;
 		case 'appearance':
 			return Mage::getStoreConfig('meigee_general/appearance');
 		break;
 		case 'patern':
 			return Mage::getStoreConfig('meigee_general/appearance/patern');
 		break;
 		case 'custompatern':
 			return Mage::getStoreConfig('meigee_general/appearance/custompatern');
 		break;
 		case 'sidebar':
 			return Mage::getStoreConfig('meigee_general/layout/sidebar');
 		break; 
 		case 'grid':
 			return Mage::getStoreConfig('meigee_general/layout/grid');
 		break; 
 		case 'cartpage':
 			return Mage::getStoreConfig('meigee_general/layout/cartpage');
 		break; 
 		case 'lang_switcher':
 			return Mage::getStoreConfig('meigee_general/lang_switcher');
 		break;
 		case 'curr_switcher':
 			return Mage::getStoreConfig('meigee_general/curr_switcher');
 		break;	       
 		case 'customlogo':
 			return Mage::getStoreConfig('meigee_general/customlogo');
 		break;
 		case 'menu':
 			return Mage::getStoreConfig('meigee_general/menu');
 		break;
 		case 'sociallinks':
 			return Mage::getStoreConfig('meigee_general/sociallinks');
 		break;
 		case 'fancybox':
 			return Mage::getStoreConfig('meigee_general/fancybox');
 		break;
 		case 'rollover':
 			return Mage::getStoreConfig('meigee_general/rollover/rollover_status');
 		break; 		
 		case 'labelnew':
 			return Mage::getStoreConfig('meigee_general/otheroptions/labelnew');
 		break;
	        case 'productpage_pagelayout':
 			return Mage::getStoreConfig('meigee_productpage/productpage/pagelayout');
 		break;
 		case 'productpage_prevnext':
 			return Mage::getStoreConfig('meigee_productpage/productpage/prevnext');
 		break;
 		case 'productpage_moreviews':
 			return Mage::getStoreConfig('meigee_productpage/productpage/moreviews');
 		break;
 		case 'productpage_collateral':
 			return Mage::getStoreConfig('meigee_productpage/productpage/collateral');
 		break;
 		case 'productpage_collateral_upsell':
 			return Mage::getStoreConfig('meigee_productpage/productpage/collateral_upsell');
 		break;
 		case 'productpage_collateral_related':
 			return Mage::getStoreConfig('meigee_productpage/productpage/collateral_related');
 		break;
 		case 'block_categories':
 			return Mage::getStoreConfig('meigee_sidebar/block_categories');
 		break;
 		case 'block_shop_by':
 			return Mage::getStoreConfig('meigee_sidebar/block_shop_by');
 		break;
 		case 'block_wishlist':
 			return Mage::getStoreConfig('meigee_sidebar/block_wishlist');
 		break;
 		case 'headerslider':
 			return Mage::getStoreConfig('meigee_headerslider/coin');
 		break;
 	}
 }

 public function getProductNewLabel ($_product) {
 	if ($this->getThemeOptions('labelnew') == true):
	 	$from = $_product->getNewsFromDate();
		$to = new Zend_Date($_product->getNewsToDate());
		$now = new Zend_Date(Mage::getModel('core/date')->timestamp(time()));
		if (isset($from) && $to->isLater($now)) return '<span class="label-new"></span>';
	endif;
	return false;
 }

 public function getSocialLinks () {
 	$links = $this->getThemeOptions ('sociallinks');
 	echo '<ul class="social-links">';
 	foreach ($links as $key=>$link) {
 		if ($link !== '')
 		echo '<li><a class="'.$key.'" href="'.$link.'"></a></li>';
 	}
 	echo '</ul>';
 }

 public function getHoverImage ($_product, $size) {
 	if ($this->getThemeOptions('rollover' ) == true):
	 	$imgcount = Mage::getModel('catalog/product')->load($_product->getId())->getMediaGalleryImages()->count();
	 	if ($imgcount>0):
	 		$_gallery = Mage::getModel('catalog/product') -> load($_product -> getId()) -> getMediaGalleryImages();
		 	foreach ($_gallery as $_image ):
		        if ($_image->getLabel() == 'hover'):
		        	echo '<span class="hover-image"><img src=' . Mage::helper('catalog/image') -> init($_product, 'thumbnail', $_image -> getFile())->constrainOnly(TRUE)->keepAspectRatio(TRUE)->keepFrame(FALSE) -> resize($size, null) . ' /></span>';
		 		break;
		    	endif;
	        endforeach;
		endif;
	endif;
 }

 public function prevnext ($product) {
 	if ($this->getThemeOptions('productpage_prevnext') == 'prevnext'):
	 	$_helper = Mage::helper('catalog/output');
		$_product = $product->getProduct();
		$prev_url = $next_url = $url = $product->getProductUrl();
		 
		if (Mage::helper('catalog/data')->getCategory()) {
		$category = Mage::helper('catalog/data')->getCategory();
		} else {
		$_ccats = Mage::helper('catalog/data')->getProduct()->getCategoryIds();
		$category = Mage::getModel('catalog/category')->load($_ccats[0]);
		}
		 
		$children = $category->getProductCollection();
		$_count = is_array($children) ? count($children) : $children->count();
		if ($_count) {
		foreach ($children as $product) {
		$plist[] = $product->getId();
		}
		 
		/**
		* Determine the previous/next link and link to current category
		*/
		$current_pid  = Mage::helper('catalog/data')->getProduct()->getId();
		$curpos   = array_search($current_pid, $plist);
		// get link for prev product
		$previd   = isset($plist[$curpos+1])? $plist[$curpos+1] : $current_pid;
		$product  = Mage::getModel('catalog/product')->load($previd);
		$prevpos  = $curpos;
		while (!$product->isVisibleInCatalog()) {
		$prevpos += 1;
		$nextid   = isset($plist[$prevpos])? $plist[$prevpos] : $current_pid;
		$product  = Mage::getModel('catalog/product')->load($nextid);
		}
		$prev_url = $product->getProductUrl();
		// get link for next product
		$nextid   = isset($plist[$curpos-1])? $plist[$curpos-1] : $current_pid;
		$product  = Mage::getModel('catalog/product')->load($nextid);
		$nextpos  = $curpos;
		while (!$product->isVisibleInCatalog()) {
		$nextpos -= 1;
		$nextid   = isset($plist[$nextpos])? $plist[$nextpos] : $current_pid;
		$product  = Mage::getModel('catalog/product')->load($nextid);
		}
		$next_url = $product->getProductUrl();
		}
	    
	    $prev_next_divider = '';
	    if ($url <> $next_url): 
		$html = '<a class="product-prev" href="' . $next_url . '">Previous</a>';
		$prev_next_divider = '<span class="prev-next-divider">&nbsp;</span>';
	    endif;
	    if ($url <> $prev_url):
	        $html .= '<a class="product-next" href="' . $prev_url . '">'.$prev_next_divider.'Next</a>';
	    endif;

	    return $html;
	else: 
		return false;
	endif;
 }

	public function isActive($attribute, $value){

	    $col = Mage::getModel('cms/block')->getCollection();
	    $col->addFieldToFilter($attribute, $value);
	    $item = $col->getFirstItem();
	    $id = $item->getData('is_active');

	    if($id == 1){
	        return true;
	    }else{
	        return false;
	    }

	}

}
?>